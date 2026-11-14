import type { TemporalEpoch, ZoomLevel } from "@timelines/types";

/**
 * Composite Temporal Coordinate (spec/02_time_and_scale.md)
 * Time = (Epoch, Coordinate, Uncertainty)
 *
 * Uses BigInt tuple (seconds + attoseconds) to represent scales from
 * 10^18 years down to 10^-18 seconds without IEEE-754 floating-point loss.
 */
export interface TemporalCoordinate {
  epoch: TemporalEpoch;
  /** Whole seconds relative to the epoch origin (signed BigInt) */
  seconds: bigint;
  /** Sub-second precision in attoseconds: 0n <= attoseconds < 10^18n */
  attoseconds: bigint;
  /** Optional uncertainty range (+/-) in seconds and attoseconds */
  uncertainty?: {
    seconds: bigint;
    attoseconds: bigint;
    circa?: boolean;
  };
}

export interface ZoomScaleDefinition {
  level: ZoomLevel;
  name: string;
  gridUnitLabel: string;
  /** Approximate grid unit duration in seconds */
  gridUnitSeconds: bigint;
}

const YEAR_SECONDS = 31_557_600n; //Julian year (365.25 days)

export const ZOOM_SCALES: Record<ZoomLevel, ZoomScaleDefinition> = {
  L0: {
    level: "L0",
    name: "Cosmic / Astronomical",
    gridUnitLabel: "1 Billion Years",
    gridUnitSeconds: 1_000_000_000n * YEAR_SECONDS,
  },
  L1: {
    level: "L1",
    name: "Geological",
    gridUnitLabel: "100 Million Years",
    gridUnitSeconds: 100_000_000n * YEAR_SECONDS,
  },
  L2: {
    level: "L2",
    name: "Evolutionary / Epochal",
    gridUnitLabel: "1 Million Years",
    gridUnitSeconds: 1_000_000n * YEAR_SECONDS,
  },
  L3: {
    level: "L3",
    name: "Prehistorical",
    gridUnitLabel: "10,000 Years",
    gridUnitSeconds: 10_000n * YEAR_SECONDS,
  },
  L4: {
    level: "L4",
    name: "Millennium",
    gridUnitLabel: "1,000 Years",
    gridUnitSeconds: 1_000n * YEAR_SECONDS,
  },
  L5: {
    level: "L5",
    name: "Century",
    gridUnitLabel: "100 Years",
    gridUnitSeconds: 100n * YEAR_SECONDS,
  },
  L6: {
    level: "L6",
    name: "Annual",
    gridUnitLabel: "1 Year",
    gridUnitSeconds: YEAR_SECONDS,
  },
  L7: {
    level: "L7",
    name: "Monthly / Daily",
    gridUnitLabel: "1 Day",
    gridUnitSeconds: 86_400n,
  },
  L8: {
    level: "L8",
    name: "Hourly / Minute",
    gridUnitLabel: "1 Hour",
    gridUnitSeconds: 3_600n,
  },
  L9: {
    level: "L9",
    name: "Sub-Second",
    gridUnitLabel: "1 Millisecond",
    gridUnitSeconds: 0n,
  },
  L10: {
    level: "L10",
    name: "High-Precision",
    gridUnitLabel: "1 Nanosecond",
    gridUnitSeconds: 0n,
  },
};

/**
 * Compares two TemporalCoordinates within the same epoch.
 * Returns -1 if a < b, 0 if a === b, 1 if a > b.
 */
export function compareCoordinates(a: TemporalCoordinate, b: TemporalCoordinate): -1 | 0 | 1 {
  if (a.epoch !== b.epoch) {
    throw new Error(`Cannot compare coordinates from different epochs (${a.epoch} vs ${b.epoch})`);
  }
  if (a.seconds < b.seconds) return -1;
  if (a.seconds > b.seconds) return 1;
  if (a.attoseconds < b.attoseconds) return -1;
  if (a.attoseconds > b.attoseconds) return 1;
  return 0;
}
