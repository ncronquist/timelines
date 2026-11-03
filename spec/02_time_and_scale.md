# Time and Scale Model

A core challenge of the **Timelines** application is representing time across vast scales. The system must support events spanning billions of years (geology, astronomy), years/days (history), and fractions of a nanosecond (particle physics, chemical reactions). 

This document defines the conceptual time and scale model without locking into database-specific data types.

---

## 1. Scale-Agnostic Time Representation

Standard systems rely on Unix epochs (representing seconds/milliseconds since 1970). This model fails for ancient history (before year 1970) and lacks precision for scientific sub-nanosecond events.

We propose a **Composite Temporal Model** representing time through three components:

$$Time = (Epoch, Coordinate, Uncertainty)$$

### A. Temporal Epoch
Determines the reference standard and the scale multiplier. Examples of epochs include:
- **Cosmological Epoch (CE)**: Years relative to the Big Bang (scaled in millions/billions of years).
- **Common Era / Historical Epoch (AD/BC)**: The standard Gregorian calendar.
- **Scientific Epoch (SE)**: Absolute seconds relative to a custom experiment start or standard atomic reference (e.g., TAI/GPS time).
- **Relative Epoch (RE)**: Offsets relative to an abstract starting point (e.g., "Day 1 of project", "Hour 3 of LHC Run").

### B. Coordinate Value
A high-precision coordinate indicating the position within that Epoch. 
- Conceptually represented as an arbitrary-precision decimal or a combined BigInt tuple (e.g., `Seconds` + `Attoseconds`).
- This allows a range from $10^{18}$ years (age of the universe is $\approx 1.38 \times 10^{10}$ years) down to $10^{-18}$ seconds (attoseconds, relevant for quantum physics).

### C. Temporal Uncertainty (Fuzziness)
Historical events are often approximate. We must support temporal uncertainty.
- **Uncertainty Range**: A value representing deviation (e.g., $+/- 50\text{ years}$ or $+/- 3\text{ nanoseconds}$).
- **Circa Flag**: Indicating that the date is approximate.
- **Fuzzy Boundaries**: The visual layout should draw the event start and end as soft, fading gradients instead of hard lines if uncertainty is high.

---

## 2. Temporal Grid and Scale Zoom Levels

To support smooth zooming, the timeline UI uses a discrete set of **Zoom Scales**. The timeline automatically switches grid markings and scale labels as the user zooms in or out.

| Level | Scale Name | Grid Unit | Example Events |
|:---|:---|:---|:---|
| **L0** | Cosmic / Astronomical | 1 Billion Years | Big Bang, Formation of Earth |
| **L1** | Geological | 100 Million Years | Continental drift, Dinosaur eras |
| **L2** | Evolutionary / Epochal | 1 Million Years | Human evolution, Ice ages |
| **L3** | Prehistorical | 10,000 Years | End of last ice age, early agriculture |
| **L4** | Millennium | 1,000 Years | Rise of empires, Bronze Age |
| **L5** | Century | 100 Years | Industrial revolution, World War era |
| **L6** | Annual | 1 Year | World War II, Space Race |
| **L7** | Monthly / Daily | 1 Day | American Civil War battles, Apollo mission |
| **L8** | Hourly / Minute | 1 Hour | Attack on Pearl Harbor, Moon Walk |
| **L9** | Sub-Second | 1 Millisecond | Chemical explosions, engine cycles |
| **L10** | High-Precision | 1 Nanosecond | LHC particle collisions, quantum state shifts |

---

## 3. Creative Expansions

### A. Elastic Time Compression (Empty Space Folding)
A linear timeline is highly inefficient when events are separated by vast expanses of inactive time.
- **Problem**: Showing the formation of Earth (4.5 billion years ago) and the first multicellular life (600 million years ago) leaves a 3.9-billion-year visual gap containing zero events.
- **Solution**: The UI supports **Elastic Time**. In this view, regions of the timeline that contain no events at the current zoom level are "folded" or "compressed" into a compact visual separator (e.g., a dashed line with a "3.9B years compressed" tag).
- **User Control**: Users can toggle between **True Linear Scale** (for accurate visual relative scale) and **Adaptive Content Scale** (for comfortable reading).

```
[Event: Earth Forms] ---====== (3.9 Billion Years Folded) ======--- [Event: First Life]
```

### B. Relativistic & Multi-Location Time
For astronomical scales or satellite orbits, time is relative to location.
- **Concept**: Support placing events in coordinate spaces that track localized relativistic time offsets (e.g., Earth-time vs. Mars-time or GPS satellite orbital time drifts).
- **Scale Translation**: The UI allows selecting a reference perspective (e.g., "Show events from the perspective of an astronaut traveling at 0.9c").

### C. Astronomical and Planetary Calendars
For fantasy writing, science fiction, or non-earth histories, the system can support custom calendars.
- **Concept**: Define custom planetary years, lunar cycles, or fictional calendar epochs (e.g., Middle-earth Third Age, Star Trek Stardates).
- The time coordinate translates dynamically between the custom calendar and the universal baseline scale.
