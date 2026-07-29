import type { SVGProps } from "react";

export function TentDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 320 210" fill="none" {...props}>
      {/* ground shadow */}
      <ellipse cx="160" cy="184" rx="115" ry="7" fill="currentColor" opacity="0.1" />
      {/* ground line */}
      <line
        x1="20"
        y1="178"
        x2="300"
        y2="178"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.35"
      />

      {/* footprint peeking out from under the tent */}
      <rect
        x="42"
        y="172"
        width="236"
        height="11"
        rx="5.5"
        fill="currentColor"
        opacity="0.12"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5 4"
      />

      {/* rainfly seam (drawn slightly larger/higher than body, dashed, suggests the outer layer) */}
      <path
        d="M48,176 Q48,58 160,42 Q272,58 272,176"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="7 6"
        opacity="0.55"
      />

      {/* main dome body, filled */}
      <path
        d="M52,176 Q52,68 160,54 Q268,68 268,176 Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* door notch with zipper */}
      <path
        d="M128,176 L160,104 L192,176"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M160,110 L155,124 L163,134 L155,146 L163,158 L157,170"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
      />
      <circle cx="160" cy="108" r="4" fill="currentColor" />

      {/* mesh vent patch */}
      <path
        d="M84,110 L104,100 L120,112 L112,132 L92,132 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeDasharray="3 3"
      />

      {/* guyline + stake, right */}
      <line x1="262" y1="120" x2="298" y2="158" stroke="currentColor" strokeWidth="2.2" />
      <path d="M291,158 L305,151 L305,165 Z" fill="currentColor" />

      {/* guyline + stake, left */}
      <line
        x1="58"
        y1="120"
        x2="24"
        y2="158"
        stroke="currentColor"
        strokeWidth="2.2"
        opacity="0.6"
      />
      <path d="M17,158 L15,151 L29,158 L15,165 Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export const TENT_HOTSPOTS = [
  {
    id: "rainfly",
    x: 50,
    y: 22,
    label: "Rainfly",
    description:
      "The outer waterproof layer over the tent body. Keeps rain and dew off — this is what you skip if you get caught assuming 'clear' forecasts stay clear.",
  },
  {
    id: "mesh-panel",
    x: 32,
    y: 58,
    label: "Mesh panel",
    description:
      "Ventilation to cut down condensation inside the tent overnight. Covered by the rainfly when it's raining, exposed when it's dry.",
  },
  {
    id: "vestibule",
    x: 50,
    y: 62,
    label: "Door / vestibule",
    description:
      "Entry point, and often a small covered area just outside it for stashing muddy boots or gear.",
  },
  {
    id: "guyline",
    x: 92,
    y: 65,
    label: "Guyline & stake",
    description:
      "Tensions the rainfly against wind. Factory stakes bend easily — this is why extra stakes matter.",
  },
  {
    id: "footprint",
    x: 50,
    y: 84,
    label: "Footprint / groundsheet",
    description:
      "A separate ground layer under the tent floor. Protects against punctures and moisture — often forgotten because it's sold separately.",
  },
];
