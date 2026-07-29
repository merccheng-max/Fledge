import type { SVGProps } from "react";

export function WaterFilterDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 260 220" fill="none" {...props}>
      {/* filter cartridge */}
      <rect x="100" y="65" width="60" height="110" rx="20" stroke="currentColor" strokeWidth="3" />
      <line
        x1="100"
        y1="100"
        x2="160"
        y2="100"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.6"
      />
      <line
        x1="100"
        y1="140"
        x2="160"
        y2="140"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.6"
      />
      {/* intake hose to source */}
      <path d="M100,90 C70,80 45,70 30,58" stroke="currentColor" strokeWidth="3" />
      <path
        d="M15,50 C22,55 28,50 35,55 C42,60 48,55 55,60"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
      {/* output hose to clean cup */}
      <path d="M160,150 C185,165 200,175 210,188" stroke="currentColor" strokeWidth="3" />
      <path d="M195,188 L225,188 L218,208 L202,208 Z" stroke="currentColor" strokeWidth="2.5" />
      {/* pump handle */}
      <rect x="118" y="42" width="24" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export const WATER_FILTER_HOTSPOTS = [
  {
    id: "cartridge",
    x: 50,
    y: 55,
    label: "Filter cartridge",
    description:
      "The actual membrane doing the work — it strains out bacteria and protozoa. It degrades over time and can clog, so check your specific filter's rated lifespan.",
  },
  {
    id: "pump",
    x: 50,
    y: 24,
    label: "Pump / squeeze mechanism",
    description:
      "Forces water through the cartridge. Some filters squeeze by hand, others use a pump lever like this.",
  },
  {
    id: "intake",
    x: 15,
    y: 25,
    label: "Intake (dirty water)",
    description: "Draws untreated water in from a stream, lake, or other natural source.",
  },
  {
    id: "output",
    x: 80,
    y: 88,
    label: "Output (clean water)",
    description:
      "Filtered water comes out here — safe to drink straight from this side, never from the intake side.",
  },
];
