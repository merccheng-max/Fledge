import type { SVGProps } from "react";

export function SleepingBagDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 300" fill="none" {...props}>
      {/* main mummy-bag outline */}
      <path
        d="M100,12 C62,12 42,42 42,80 L42,220 C42,258 62,288 100,288 C138,288 158,258 158,220 L158,80 C158,42 138,12 100,12 Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* hood / draft collar */}
      <path
        d="M62,45 C62,25 78,14 100,14 C122,14 138,25 138,45"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="5 4"
      />
      {/* zipper */}
      <line
        x1="152"
        y1="60"
        x2="152"
        y2="265"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 4"
      />
      {/* draft tube (parallel insulated flap behind zipper) */}
      <line
        x1="140"
        y1="65"
        x2="140"
        y2="260"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
      {/* footbox taper emphasis */}
      <path
        d="M55,255 C55,272 72,285 100,285 C128,285 145,272 145,255"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export const SLEEPING_BAG_HOTSPOTS = [
  {
    id: "hood",
    x: 50,
    y: 10,
    label: "Hood / draft collar",
    description:
      "Cinches around your head and shoulders to trap heat — most of your body heat escapes through your head, so this matters more than people expect.",
  },
  {
    id: "zipper",
    x: 76,
    y: 45,
    label: "Zipper",
    description:
      "Full-length zippers let you vent the bag if you get too warm, or unzip it flat to use as a blanket in mild weather.",
  },
  {
    id: "draft-tube",
    x: 68,
    y: 60,
    label: "Draft tube",
    description:
      "An insulated flap running alongside the zipper that blocks cold air from leaking through the zipper line — cheap bags often skip this.",
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
