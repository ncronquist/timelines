import { describe, expect, it } from "bun:test";
import { app } from "./app";

describe("@timelines/api", () => {
  it("GET /healthz returns 200 ok and echoes x-request-id", async () => {
    const response = await app.handle(
      new Request("http://localhost/healthz", {
        headers: { "x-request-id": "test-req-123" },
      }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("x-request-id")).toBe("test-req-123");
    const body = (await response.json()) as { status: string };
    expect(body.status).toBe("ok");
  });

  it("GET /api/v1/scales returns L0-L10 zoom scales", async () => {
    const response = await app.handle(new Request("http://localhost/api/v1/scales"));
    expect(response.status).toBe(200);
    const body = (await response.json()) as { scales: Array<{ level: string }> };
    expect(body.scales).toHaveLength(11);
    expect(body.scales[0]?.level).toBe("L0");
  });
});
