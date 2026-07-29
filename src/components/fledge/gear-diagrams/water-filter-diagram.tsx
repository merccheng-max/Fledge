import type { SVGProps } from "react";

export function WaterFilterDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 280 220" fill="none" {...props}>
      {/* intake hose to source */}
      <path
        d="M92,108 C65,118 48,128 38,142"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14,146 C20,140 26,152 32,146 C38,140 44,152 50,146"
        stroke="currentColor"
        strokeWidth="2.2"
        opacity="0.55"
        fill="none"
      />

      {/* output hose to bottle */}
      <path
        d="M188,116 C210,128 222,138 228,152"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* clean water bottle */}
      <rect
        x="216"
        y="150"
        width="24"
        height="10"
        rx="3"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M204,168 C204,162 210,160 228,160 C246,160 252,162 252,168 L252,196 C252,206 240,212 228,212 C216,212 204,206 204,196 Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M210,178 L246,178" stroke="currentColor" strokeWidth="1.8" opacity="0.35" />

      {/* filter cartridge body (horizontal pill) */}
      <rect
        x="90"
        y="85"
        width="100"
        height="50"
        rx="25"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      <line
        x1="115"
        y1="90"
        x2="115"
        y2="130"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.4"
      />
      <line
        x1="165"
        y1="90"
        x2="165"
        y2="130"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.4"
      />

      {/* pump T-handle */}
      <rect
        x="134"
        y="52"
        width="12"
        height="35"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <rect
        x="112"
        y="42"
        width="56"
        height="11"
        rx="5.5"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export const WATER_FILTER_HOTSPOTS = [
  {
    id: "cartridge",
    x: 50,
    y: 50,
    label: "Filter cartridge",
    description:
      "The actual membrane doing the work — it strains out bacteria and protozoa. It degrades over time and can clog, so check your specific filter's rated lifespan.",
  },
  {
    id: "pump",
    x: 50,
    y: 21,
    label: "Pump handle",
    description:
      "Forces water through the cartridge. Some filters squeeze by hand instead of pumping like this one.",
  },
  {
    id: "intake",
    x: 12,
    y: 66,
    label: "Intake (dirty water)",
    description: "Draws untreated water in from a stream, lake, or other natural source.",
  },
  {
    id: "output",
    x: 84,
    y: 85,
    label: "Output (clean water)",
    description:
      "Filtered water comes out here — safe to drink straight from this side, never from the intake side.",
  },
];
