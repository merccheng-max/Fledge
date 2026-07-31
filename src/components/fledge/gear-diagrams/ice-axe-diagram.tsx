import type { SVGProps } from "react";

export function IceAxeDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 140 300" fill="none" {...props}>
      {/* shaft */}
      <rect
        x="62"
        y="70"
        width="14"
        height="190"
        rx="6"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      {/* grip texture */}
      <line
        x1="62"
        y1="130"
        x2="76"
        y2="130"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.4"
      />
      <line
        x1="62"
        y1="150"
        x2="76"
        y2="150"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.4"
      />
      <line
        x1="62"
        y1="170"
        x2="76"
        y2="170"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.4"
      />

      {/* spike at bottom */}
      <path
        d="M69,260 L69,290 L64,294 L74,294 Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* head (pick + adze), mounted at top of shaft */}
      <rect
        x="52"
        y="58"
        width="34"
        height="16"
        rx="4"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* pick — curved spike, one side */}
      <path
        d="M52,64 C30,58 16,64 10,80 C16,74 28,70 40,72"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* adze — flat angled blade, other side */}
      <path
        d="M86,62 L118,52 L122,64 L92,72 Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* wrist leash loop */}
      <path
        d="M62,96 C48,100 44,112 52,120 C58,126 66,124 68,116"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.6"
      />
    </svg>
  );
}

export const ICE_AXE_HOTSPOTS = [
  {
    id: "pick",
    x: 15,
    y: 23,
    label: "Pick",
    description:
      "The curved spike used for self-arrest — jamming it into the snow to stop a slide before it becomes a fall. This is the tool's core safety function.",
  },
  {
    id: "adze",
    x: 78,
    y: 20,
    label: "Adze",
    description: "The flat blade, used for chopping steps or platforms into snow and ice.",
  },
  {
    id: "shaft",
    x: 50,
    y: 55,
    label: "Shaft",
    description:
      "The handle. Length matters — a shaft that's too long or short changes how effectively you can self-arrest, so this isn't a one-size-fits-all choice.",
  },
  {
    id: "spike",
    x: 50,
    y: 95,
    label: "Spike",
    description: "The pointed bottom end, used like a cane for balance on moderate snow slopes.",
  },
];
