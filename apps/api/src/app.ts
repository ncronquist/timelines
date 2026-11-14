import { cors } from "@elysiajs/cors";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { swagger } from "@elysiajs/swagger";
import { trace } from "@opentelemetry/api";
import { ZOOM_SCALES } from "@timelines/time-engine";
import { ZoomLevelSchema } from "@timelines/types";
import { Elysia, t } from "elysia";
import { queryClient } from "./db";
import { logger } from "./logger";

export const app = new Elysia()
  .use(opentelemetry())
  .use(
    cors({
      origin: true,
      credentials: true,
    }),
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "Timelines API",
          version: "0.1.0",
          description: "Multi-scale interactive timelines backend API",
        },
      },
    }),
  )
  .derive(({ request, set }) => {
    const reqId = request.headers.get("x-request-id") ?? crypto.randomUUID();
    set.headers["x-request-id"] = reqId;

    const activeSpan = trace.getActiveSpan()?.spanContext();
    const log = logger.child({
      reqId,
      traceId: activeSpan?.traceId,
      spanId: activeSpan?.spanId,
    });

    return { reqId, log };
  })
  .get(
    "/healthz",
    () => ({
      status: "ok" as const,
      timestamp: new Date().toISOString(),
    }),
    {
      response: t.Object({
        status: t.Literal("ok"),
        timestamp: t.String(),
      }),
    },
  )
  .get(
    "/readyz",
    async ({ set, log }) => {
      try {
        await queryClient`SELECT 1`;
        return { status: "ready" as const };
      } catch (err) {
        log.error({ err }, "Database readiness check failed");
        set.status = 503;
        return { status: "unavailable" as const };
      }
    },
    {
      response: {
        200: t.Object({ status: t.Literal("ready") }),
        503: t.Object({ status: t.Literal("unavailable") }),
      },
    },
  )
  .get(
    "/api/v1/scales",
    () => ({
      scales: Object.values(ZOOM_SCALES).map((scale) => ({
        level: scale.level,
        name: scale.name,
        gridUnitLabel: scale.gridUnitLabel,
        gridUnitSeconds: scale.gridUnitSeconds.toString(),
      })),
    }),
    {
      response: t.Object({
        scales: t.Array(
          t.Object({
            level: ZoomLevelSchema,
            name: t.String(),
            gridUnitLabel: t.String(),
            gridUnitSeconds: t.String(),
          }),
        ),
      }),
    },
  );

export type App = typeof app;
