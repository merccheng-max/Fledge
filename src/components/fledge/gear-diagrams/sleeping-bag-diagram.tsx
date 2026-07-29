import type { SVGProps } from "react";

export function SleepingBagDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 300" fill="none" {...props}>
      {/* main mummy-bag silhouette, filled */}
      <path
        d="M100,10 C60,10 38,42 38,82 L38,222 C38,262 60,290 100,290 C140,290 162,262 162,222 L162,82 C162,42 140,10 100,10 Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* baffle / quilting lines to read as insulated fabric */}
      <path d="M42,95 Q100,102 158,95" stroke="currentColor" strokeWidth="1.8" opacity="0.4" />
      <path d="M40,140 Q100,148 160,140" stroke="currentColor" strokeWidth="1.8" opacity="0.4" />
      <path d="M39,185 Q100,193 161,185" stroke="currentColor" strokeWidth="1.8" opacity="0.4" />
      <path d="M40,230 Q100,236 160,230" stroke="currentColor" strokeWidth="1.8" opacity="0.4" />

      {/* hood opening + drawstring toggle */}
      <path
        d="M60,38 C60,20 78,12 100,12 C122,12 140,20 140,38"
        stroke="currentColor"
        strokeWidth="2.8"
      />
      <circle cx="100" cy="30" r="5" fill="currentColor" />
      <path d="M92,30 L84,26 M108,30 L116,26" stroke="currentColor" strokeWidth="1.8" />

      {/* zipper (zigzag) with pull tab */}
      <path
        d="M150,62 L145,80 L152,98 L145,116 L152,134 L145,152 L152,170 L145,188 L152,206 L145,224 L150,255"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.75"
      />
      <rect x="144" y="55" width="12" height="10" rx="2" fill="currentColor" />

      {/* footbox cap */}
      <path
        d="M52,258 C52,276 72,288 100,288 C128,288 148,276 148,258"
        stroke="currentColor"
        strokeWidth="2.8"
      />
    </svg>
  );
}

export const SLEEPING_BAG_HOTSPOTS = [
  {
    id: "hood",
    x: 50,
    y: 9,
    label: "Hood / draft collar",
    description:
      "Cinches around your head and shoulders to trap heat — most of your body heat escapes through your head, so this matters more than people expect.",
  },
  {
    id: "zipper",
    x: 74,
    y: 40,
    label: "Zipper",
    description:
      "Full-length zippers let you vent the bag if you get too warm, or unzip it flat to use as a blanket in mild weather.",
  },
  {
    id: "baffles",
    x: 50,
    y: 47,
    label: "Baffles / quilting",
    description:
      "The stitched channels that keep insulation evenly distributed instead of clumping in one spot — cheap bags often skip enough of these.",
  },
  {
    id: "footbox",
    x: 50,
    y: 90,
    label: "Footbox",
    description:
      "The tapered end at your feet. A roomier footbox means more comfort but slightly less warmth efficiency.",
  },
];
