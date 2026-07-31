import type { SVGProps } from "react";

export function BackpackingPackDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 300" fill="none" {...props}>
      {/* main compartment body */}
      <path
        d="M50,90 Q46,80 60,74 L150,74 Q164,80 160,90 L168,240 Q168,258 150,262 L64,262 Q46,258 46,240 Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* top lid / brain */}
      <path
        d="M56,74 Q56,50 106,46 Q156,50 156,74 Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <line
        x1="80"
        y1="60"
        x2="132"
        y2="60"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.4"
      />

      {/* side pocket */}
      <path
        d="M158,110 Q176,112 178,134 L174,168 Q172,180 158,180 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeDasharray="4 3"
      />

      {/* front compression straps */}
      <line
        x1="60"
        y1="130"
        x2="152"
        y2="130"
        stroke="currentColor"
        strokeWidth="2.2"
        opacity="0.55"
      />
      <line
        x1="60"
        y1="180"
        x2="152"
        y2="180"
        stroke="currentColor"
        strokeWidth="2.2"
        opacity="0.55"
      />

      {/* hip belt */}
      <path
        d="M40,244 Q106,268 172,244 L176,262 Q106,288 36,262 Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* shoulder straps */}
      <path
        d="M64,78 C50,96 46,120 52,148"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M146,78 C160,96 164,120 158,148"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const BACKPACKING_PACK_HOTSPOTS = [
  {
    id: "hip-belt",
    x: 50,
    y: 87,
    label: "Hip belt",
    description:
      "Should carry most of the load on your hips, not your shoulders — a properly fitted belt is the single biggest factor in whether a heavy pack feels manageable or miserable.",
  },
  {
    id: "shoulder-straps",
    x: 20,
    y: 42,
    label: "Shoulder straps",
    description:
      "Stabilize the load and pull it in close to your back — not the primary weight-bearing point.",
  },
  {
    id: "main-compartment",
    x: 50,
    y: 55,
    label: "Main compartment",
    description:
      "Where the bulk of your gear goes — sized in liters, and this is the number that determines whether your gear actually fits.",
  },
  {
    id: "lid",
    x: 50,
    y: 18,
    label: "Top lid / brain",
    description:
      "Quick-access pocket for things you need without digging into the main pack — snacks, map, headlamp.",
  },
  {
    id: "side-pocket",
    x: 82,
    y: 47,
    label: "Side pocket",
    description: "Usually mesh or stretch fabric, sized for a water bottle or quick-grab items.",
  },
];
