import { ZOOM_SCALES } from "@timelines/time-engine";
import type { ZoomLevel } from "@timelines/types";
import { useState } from "react";

export function App() {
  const [activeZoom, setActiveZoom] = useState<ZoomLevel>("L6");
  const currentScale = ZOOM_SCALES[activeZoom];

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      {/* Top Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.8)]" />
          <span className="font-semibold tracking-tight text-slate-100">Timelines</span>
          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-xs text-slate-400">
            {currentScale.level} · {currentScale.name}
          </span>
        </div>
        <div className="text-xs text-slate-400">Grid Unit: {currentScale.gridUnitLabel}</div>
      </header>

      {/* Main 3-Column Workspace (spec/03_ui_ux_spec.md) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Workspace Sidebar */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-slate-800/80 bg-slate-900/40 p-4">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Zoom Scale (L0–L10)
          </h2>
          <div className="flex flex-col gap-1 overflow-y-auto">
            {Object.values(ZOOM_SCALES).map((scale) => (
              <button
                key={scale.level}
                type="button"
                onClick={() => setActiveZoom(scale.level)}
                className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs transition ${
                  activeZoom === scale.level
                    ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <span className="font-mono font-medium">{scale.level}</span>
                <span className="truncate pl-2">{scale.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Center Multi-Track Timeline Canvas Viewport */}
        <main className="relative flex flex-1 flex-col items-center justify-center bg-slate-950 p-8">
          <div className="max-w-md text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-indigo-400">
              {currentScale.level} — {currentScale.gridUnitLabel}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-100">{currentScale.name}</h1>
            <p className="mt-2 text-sm text-slate-400">
              Hybrid Canvas2D + Virtualized DOM viewport ready for{" "}
              <code className="text-slate-300">@timelines/time-engine</code> projection.
            </p>
          </div>
        </main>

        {/* Right Detail Drawer Placeholder */}
        <aside className="hidden w-80 shrink-0 border-l border-slate-800/80 bg-slate-900/40 p-4 lg:block">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Event Detail
          </h2>
          <p className="mt-3 text-xs text-slate-500">
            Select an event node on the canvas to inspect its version history, media, and causal
            threads.
          </p>
        </aside>
      </div>
    </div>
  );
}
