import type { SVGProps } from "react";

export function TentDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 300 200" fill="none" {...props}>
      <line
        x1="20"
        y1="172"
        x2="280"
        y2="172"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
      />
      {/* rainfly (outer, dashed) */}
      <path
        d="M50,172 C50,95 108,50 150,50 C192,50 250,95 250,172"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="6 5"
        opacity="0.6"
      />
      {/* tent body (inner dome) */}
      <path
        d="M60,172 C60,102 110,64 150,64 C190,64 240,102 240,172"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* mesh panel */}
      <rect
        x="98"
        y="88"
        width="34"
        height="22"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 3"
      />
      {/* door / vestibule */}
      <path d="M122,172 L150,122 L178,172" stroke="currentColor" strokeWidth="2.5" />
      {/* guyline + stake */}
      <line x1="242" y1="118" x2="272" y2="152" stroke="currentColor" strokeWidth="2" />
      <path d="M266,152 L280,146 L280,158 Z" fill="currentColor" />
      {/* footprint */}
      <rect
        x="55"
        y="170"
        width="190"
        height="7"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.7"
      />
    </svg>
  );
}

export const TENT_HOTSPOTS = [
  {
    id: "rainfly",
    x: 50,
    y: 27,
    label: "Rainfly",
    description:
      "The outer waterproof layer over the tent body. Keeps rain and dew off — this is what you skip if you get caught assuming 'clear' forecasts stay clear.",
  },
  {
    id: "mesh-panel",
    x: 38,
    y: 47,
    label: "Mesh panel",
    description:
      "Ventilation to cut down condensation inside the tent overnight. Covered by the rainfly when it's raining, exposed when it's dry.",
  },
  {
    id: "vestibule",
    x: 50,
    y: 67,
    label: "Door / vestibule",
    description:
      "Entry point, and often a small covered area just outside it for stashing muddy boots or gear.",
  },
  {
    id: "guyline",
    x: 90,
    y: 70,
    label: "Guyline & stake",
    description:
      "Tensions the rainfly against wind. Factory stakes bend easily — this is why extra stakes matter.",
  },
  {
    id: "footprint",
    x: 50,
    y: 87,
    label: "Footprint / groundsheet",
    description:
      "A separate ground layer under the tent floor. Protects against punctures and moisture — often forgotten because it's sold separately.",
  },
];
