# Timelines App Specifications

Welcome to the **Timelines** specification directory. This project is built using **Spec-Driven Development (SDD)**, where we define our product goals, data concepts, user experiences, and architecture in specification files before writing code.

This centralized `./spec` directory contains all high-level product and technical specifications. As the project grows and we introduce separate application packages (e.g., API backend, Web frontend), localized specs will reside in their respective folders, while keeping this directory for global, cross-cutting specs.

## Specification Index

1. **[Core Concepts](file:///home/ncronquist/Documents/projects/timelines/spec/01_core_concepts.md)**
   - Definitions of core domain resources: Events, Timelines, and Level of Detail (LoD).
   - Relations between Events and Timelines.
   - Creative expansions: Event Causality, Tagging, and Event templates.

2. **[Time and Scale Model](file:///home/ncronquist/Documents/projects/timelines/spec/02_time_and_scale.md)**
   - Representing time from cosmic/geological scales down to sub-nanosecond intervals.
   - Conceptual handling of historical uncertainty (+/- years) and relative dates.
   - Elastic timeline concepts (collapsing empty space).

3. **[UI and UX Specification](file:///home/ncronquist/Documents/projects/timelines/spec/03_ui_ux_spec.md)**
   - Vertical timeline view, layout layout, side-by-side timeline comparisons.
   - Interactive zoom controls, transitions, and detail panels.
   - Creative expansions: Contemporaries Finder, Time-Travel Bookmarks.

4. **[Collaboration and Organizations](file:///home/ncronquist/Documents/projects/timelines/spec/04_collaboration_and_orgs.md)**
   - Individual users vs. Organizations.
   - Sharing, permissions, and roles (educational classrooms, corporate environments).
   - SSO and identity management.

5. **[Monorepo and Future Clients](file:///home/ncronquist/Documents/projects/timelines/spec/05_future_considerations.md)**
   - Monorepo directory structure.
   - Extensions to Mobile, VR/AR, and third-party embeds.

---

*Note: These documents focus strictly on product specs, user experience, and domain design. Technical implementation details (languages, libraries, database engines) are intentionally excluded and will be decided in later execution phases.*
