import { type Static, Type } from "@sinclair/typebox";

/**
 * Visibility levels for Events and Timelines (spec/01_core_concepts.md)
 */
export const VisibilityLevelSchema = Type.Union([
  Type.Literal("private"),
  Type.Literal("shared"),
  Type.Literal("org_only"),
  Type.Literal("public"),
]);
export type VisibilityLevel = Static<typeof VisibilityLevelSchema>;

/**
 * Lifecycle status for soft-delete/archiving support (spec/01_core_concepts.md)
 */
export const LifecycleStatusSchema = Type.Union([Type.Literal("active"), Type.Literal("deleted")]);
export type LifecycleStatus = Static<typeof LifecycleStatusSchema>;

/**
 * Temporal Epochs (spec/02_time_and_scale.md)
 */
export const TemporalEpochSchema = Type.Union([
  Type.Literal("CE"), // Cosmological Epoch (relative to Big Bang)
  Type.Literal("AD_BC"), // Common Era / Gregorian Historical Epoch
  Type.Literal("SE"), // Scientific Epoch (TAI / experiment reference)
  Type.Literal("RE"), // Relative Epoch (offset from abstract start)
]);
export type TemporalEpoch = Static<typeof TemporalEpochSchema>;

/**
 * Discrete Zoom Levels L0 (Cosmic) through L10 (Nanosecond) (spec/02_time_and_scale.md)
 */
export const ZoomLevelSchema = Type.Union([
  Type.Literal("L0"),
  Type.Literal("L1"),
  Type.Literal("L2"),
  Type.Literal("L3"),
  Type.Literal("L4"),
  Type.Literal("L5"),
  Type.Literal("L6"),
  Type.Literal("L7"),
  Type.Literal("L8"),
  Type.Literal("L9"),
  Type.Literal("L10"),
]);
export type ZoomLevel = Static<typeof ZoomLevelSchema>;

/**
 * Organization member roles (spec/04_collaboration_and_orgs.md)
 */
export const OrganizationRoleSchema = Type.Union([
  Type.Literal("owner"),
  Type.Literal("admin"),
  Type.Literal("editor"),
  Type.Literal("viewer"),
]);
export type OrganizationRole = Static<typeof OrganizationRoleSchema>;
