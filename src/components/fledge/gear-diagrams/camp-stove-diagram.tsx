import type { SVGProps } from "react";

export function CampStoveDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 260 240" fill="none" {...props}>
      {/* ground shadow */}
      <ellipse cx="130" cy="224" rx="55" ry="6" fill="currentColor" opacity="0.1" />

      {/* pot support arms (tripod), drawn behind everything else */}
      <path d="M112,102 L62,72" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M56,68 L68,76" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M148,102 L198,72" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M204,68 L192,76" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M130,96 L130,58"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M124,60 L136,60"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* flame marks */}
      <path
        d="M112,88 C110,80 114,76 112,68 C118,74 120,82 114,90 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M130,84 C128,74 133,69 130,60 C137,67 139,76 133,86 Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M148,88 C146,80 150,76 148,68 C154,74 156,82 150,90 Z"
        fill="currentColor"
        opacity="0.55"
      />

      {/* burner head */}
      <ellipse
        cx="130"
        cy="104"
        rx="28"
        ry="13"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* ignition piezo button */}
      <circle cx="166" cy="104" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="159" y1="104" x2="150" y2="104" stroke="currentColor" strokeWidth="2.5" />

      {/* valve stem connecting burner to canister */}
      <rect
        x="120"
        y="115"
        width="20"
        height="30"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* fuel canister */}
      <path
        d="M84,150 L84,214 C84,222 104,228 130,228 C156,228 176,222 176,214 L176,150"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <ellipse
        cx="130"
        cy="150"
        rx="46"
        ry="12"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="3.5"
      />
    </svg>
  );
}

export const CAMP_STOVE_HOTSPOTS = [
  {
    id: "burner",
    x: 50,
    y: 43,
    label: "Burner head",
    description:
      "Where the flame comes out and heats your cookware. Keep it clear of debris for an even flame.",
  },
  {
    id: "pot-supports",
    x: 24,
    y: 30,
    label: "Pot support arms",
    description:
      "Hold your pot or pan steady above the flame. Check they're fully unfolded and locked before cooking.",
  },
  {
    id: "ignition",
    x: 68,
    y: 43,
    label: "Ignition button",
    description:
      "Sparks the burner without a separate lighter — useful, but bring backup matches in case it fails.",
  },
  {
    id: "canister",
    x: 50,
    y: 78,
    label: "Fuel canister",
    description:
      "The actual fuel source — this is the piece people forget even when they remember the stove itself. Make sure it's the compatible type for your specific stove.",
  },
];
