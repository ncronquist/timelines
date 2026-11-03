# Monorepo and Future Considerations

This specification outlines the long-term directory structure of the **Timelines** monorepo, as well as the conceptual design for future client expansions, integrations, and publishing mechanics.

---

## 1. Monorepo Organization

To support rapid initial iteration and allow sharing of core logic between the API and frontends, the project is structured as a monorepo.

### Conceptual Directory Structure
```
/timelines
├── /spec                     <-- High-level/cross-project product specifications
│   ├── README.md
│   ├── 01_core_concepts.md
│   └── ...
├── /apps                     <-- Execution packages
│   ├── /api                  <-- API Backend
│   │   ├── /spec             <-- API-specific technical specs (e.g. routing endpoints)
│   │   └── ...
│   ├── /web                  <-- Web UI Frontend (vertical scroll canvas)
│   │   ├── /spec             <-- Web-specific UI/UX specs
│   │   └── ...
│   └── /mobile               <-- (Future) React Native or Swift/Kotlin client
│       └── ...
├── /packages                 <-- Shared libraries
│   ├── /time-engine          <-- Universal temporal parser and coordinate math library
│   ├── /types                <-- Shared type schemas
│   └── /ui-components        <-- Reusable design tokens and assets
└── README.md
```

- **Spec Evolution**: Global files in `/spec` remain the source of truth for product definition. Subproject-specific technical plans (e.g. route plans, state stores) reside in `/apps/{app-name}/spec/` to avoid cluttering the top-level directory.

---

## 2. Future Clients and Experiences

While the initial target is a Web UI, the data models are designed to enable native transitions to other interfaces.

### A. Mobile Client
- **Interaction**: High-frequency scrolling is native to mobile. Vertical scrolls are manipulated via flick gestures, and zoom uses standard multi-touch pinch.
- **Offline Caching**: Students or museum-goers may want to view timelines offline. The mobile client will cache timeline structures and download images/media locally, enabling offline historical tours.
- **Geographic Timeline Overlay (AR)**: A mobile-specific feature matching timeline events to geographic coordinates. As a user walks through a historical site (e.g., Rome), the AR camera overlays historical events on their screen at the exact location they occurred.

### B. Virtual Reality (VR) "Hall of Time"
- **Navigation**: Time is represented spatially as a long corridor or outdoor path ("The Cosmic Walk"). Walking forward moves the user forward in time.
- **Scale Shifts**: Moving vertically (looking up/down or raising the height of the VR camera) changes the zoom scale. Looking up at the ceiling reveals astronomical scales (planetary tracks), while looking down at the floor displays micro-scale events.
- **3D Artifacts**: Events can link to 3D models (glTF/USDZ). In VR, these models appear as physical museum pieces on stands next to their chronological event marks, allowing users to pick up and inspect historical artifacts.

---

## 3. Integrations and API Consumers

To foster the open-source mission of the project, timelines must be highly shareable.

### A. Dynamic Embeds (Iframes)
- Websites (e.g., Wikipedia, historical blogs, news articles) can embed a timeline tracking a specific event sequence.
- Embeds are interactive, allowing readers to scroll, search, and zoom within the boundaries set by the publisher.

### B. Open Data Standard (JSON-LD Feed)
- Timelines will expose events in an open-standard JSON-LD format. This allows universities or researchers to query the timeline API and ingest chronological data directly into statistical packages or timeline-based research tools.
