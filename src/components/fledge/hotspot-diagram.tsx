import { useState, type ComponentType, type SVGProps } from "react";

export interface Hotspot {
  id: string;
  /** Position as a percentage of the diagram's width/height (0-100). */
  x: number;
  y: number;
  label: string;
  description: string;
}

export function HotspotDiagram({
  Diagram,
  hotspots,
}: {
  Diagram: ComponentType<SVGProps<SVGSVGElement>>;
  hotspots: Hotspot[];
}) {
  const [activeId, setActiveId] = useState<string | null>(hotspots[0]?.id ?? null);
  const active = hotspots.find((h) => h.id === activeId);

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4">
      <div className="relative mx-auto aspect-[4/3] w-full max-w-xs text-primary">
        <Diagram className="h-full w-full" />
        {hotspots.map((h) => (
          <button
            key={h.id}
            type="button"
            aria-label={h.label}
            onClick={() => setActiveId(h.id)}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span
              className={`block h-3.5 w-3.5 rounded-full border-2 border-background shadow-sm transition-transform ${
                activeId === h.id ? "scale-125 bg-accent" : "bg-primary hover:scale-110"
              }`}
            />
            {activeId !== h.id && (
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/50" />
            )}
          </button>
        ))}
      </div>

      {active && (
        <div className="animate-in fade-in slide-in-from-bottom-2 mt-3 rounded-lg bg-card p-3 duration-300">
          <p className="text-sm font-semibold text-foreground">{active.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{active.description}</p>
        </div>
      )}

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Tap a point on the diagram to learn what it does.
      </p>
    </div>
  );
}
