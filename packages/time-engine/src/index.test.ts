import { describe, expect, it } from "bun:test";
import { ZOOM_SCALES, compareCoordinates } from "./index";

describe("@timelines/time-engine", () => {
  it("defines all zoom scales L0 through L10", () => {
    expect(Object.keys(ZOOM_SCALES)).toHaveLength(11);
    expect(ZOOM_SCALES.L0.name).toBe("Cosmic / Astronomical");
    expect(ZOOM_SCALES.L10.name).toBe("High-Precision");
  });

  it("compares coordinates accurately across seconds and attoseconds", () => {
    const t1 = { epoch: "SE" as const, seconds: 10n, attoseconds: 500n };
    const t2 = { epoch: "SE" as const, seconds: 10n, attoseconds: 501n };
    expect(compareCoordinates(t1, t2)).toBe(-1);
    expect(compareCoordinates(t2, t1)).toBe(1);
    expect(compareCoordinates(t1, t1)).toBe(0);
  });
});
