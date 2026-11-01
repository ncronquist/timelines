# UI and UX Specification

The UI is the primary interface for **Timelines**. It must be fast, visually stunning, and highly interactive. The core interaction model centers around a **vertical scrolling canvas** that supports multi-track alignment and zoom transitions.

---

## 1. Core Layout and Structure

The web application layout is divided into three primary regions:

```
+-----------------------------------------------------------------------------+
|  [Logo] Timelines App   | Share | Compare | Search... | Settings  | Profile |
+-----------------------------------------------------------------------------+
|   Workspace  |                                               |              |
|   Sidebar    |     Timeline Track A    |  Timeline Track B   |    Detail    |
|              |                         |                     |    Drawer    |
|  - Active    |  2000                   | 2000                |              |
|    Timelines |   |                     |  |                  |  Event Name  |
|              |   o Event A1            |  o Event B1         |              |
|  - Library   |   |                     |  |                  |  [Media]     |
|              |   |                     |  |                  |              |
|  - Search    |   |                     |  o Event B2         |  Description |
|              |   2010                  | 2010                |  with rich   |
|  - Filters   |   o Event A2            |  |                  |  formatting. |
|              |   |                     |  |                  |              |
|              |   |                     |  o Event B3         |  Timeline    |
|              |   2020                  | 2020                |  Links       |
|              |                                               |              |
+-----------------------------------------------------------------------------+
```

### A. Workspace Sidebar (Left)
- **Active Tracks**: List of timelines currently overlaid on the canvas. Users can drag to reorder tracks, toggle visibility, change color themes, or remove them.
- **Timeline Library**: Access to personal, organizational, and public timelines.
- **Search & Filters**: Global filter controls (e.g., filter events by tags `#space`, `#politics`, or by keyword).

### B. Scrolling Timeline Canvas (Center)
- **Vertical Orientation**: Time progresses downwards (past at the top, future at the bottom). 
- **Parallel Tracks**: Each active timeline is represented as a vertical column (track) next to the others. Tracks scroll in perfect sync, aligning temporal coordinates.
- **Grid Lines**: Horizontal grid lines represent time increments (e.g., years, days) dynamically updating based on zoom level.
- **Adaptive Spanning**: Duration events are rendered as colored pill-shaped brackets spanning the length of their time duration. Point events are rendered as circular nodes.

### C. Detail Drawer (Right)
- Slides in smoothly from the right side of the screen when an event is clicked.
- Displays full media carousels (images, video player, audio playback), rich description texts, tags, custom metadata, and relationship mappings (e.g., "Related Events", "Causes", "Effects").

---

## 2. Interactive Zooming and Level of Detail (LoD)

Zooming is the core exploratory feature of the app. It must feel fluid and responsive.

### A. Zoom Gestures
- **Desktop**: Mouse wheel zoom (Ctrl + Scroll) or trackpad pinch-to-zoom. The zoom centers on the cursor's location.
- **Mobile/Tablet**: Standard pinch gesture.
- **Zoom Bar**: A floating vertical slider on the side of the screen showing the current scale (e.g., Cosmic $\leftrightarrow$ Nanosecond) with visual shortcuts (milestone icons).

### B. Level of Detail (LoD) Transitions
As the user zooms:
- **Fade In / Out**: Minor events fade in as the zoom level reaches their visible threshold. High-level events remain visible but may shrink in size to let minor events take center stage.
- **Clustering (Event Stacking)**: If multiple events occur at nearly the same time at a zoomed-out scale, they collapse into a single "Cluster Node" (e.g., "15 Events"). Hovering or clicking on this cluster expands it. Zooming in past a certain threshold automatically unpacks the cluster.
- **Sticky Date Labels**: Major date markings (e.g., "19th Century") stick to the top of the timeline track during scrolling until the next epoch pushes it out of the frame.

---

## 3. Creative Expansions

### A. Contemporaries Finder (Temporal Cross-Referencing)
- **Concept**: A tool that automatically highlights "what else was happening at this exact moment."
- **Interaction**: Selecting an event in Timeline Track A draws a horizontal highlighting beam across all other active tracks, calling out overlapping events.
- **Example**: Clicking "Birth of Shakespeare (1564)" in England highlights who was reigning in the Ming Dynasty of China or the Ottoman Empire on the adjacent track, prompting cross-cultural connections.

### B. Time-Travel Bookmarks & Eras
- **Concept**: Saved view states that preserve active timelines, filter criteria, and zoom level.
- **Examples**:
  - A bookmark called "Mesozoic Era" sets zoom to L1 (Geological) and active tracks to Earth Crust Evolution and Paleontology.
  - A bookmark called "Cold War Race" sets zoom to L6 (Annual), active tracks to US History and USSR History, and filters for `#aerospace`.

### C. Dynamic Swimlanes (Sub-Tracks)
- **Concept**: Individual timeline tracks can be subdivided into horizontal swimlanes to organize events categorically.
- **Visuals**: A single "Biography of Leonardo da Vinci" track can be divided into three sub-tracks: *Artistic Works*, *Scientific Inventions*, and *Personal Life*. Events are automatically positioned in their respective lanes, reducing clutter while preserving alignment.

### D. Dark Mode & HSL Color Coding
- The UI defaults to a premium dark mode with glassmorphic panels and glowing accents.
- Timelines are dynamically colored using an HSL palette, ensuring that adjacent tracks remain visually distinct and cohesive without manual color mapping.
