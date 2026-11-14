import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Structured Pino logger (spec/06_backend_architecture.md)
 * Emits concise root keys (ts, lvl, reqId, traceId, spanId, msg) in production
 * and uses pino-pretty in local development.
 */
export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  messageKey: "msg",
  timestamp: () => `,"ts":${Date.now()}`,
  formatters: {
    level(label) {
      return { lvl: label };
    },
  },
  ...(isDev
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            messageKey: "msg",
            timestampKey: "ts",
          },
        },
      }
    : {}),
});
