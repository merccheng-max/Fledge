import type { SVGProps } from "react";

export function CampStoveDiagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 260 220" fill="none" {...props}>
      {/* wind screen */}
      <path d="M85,60 C65,75 60,105 78,130" stroke="currentColor" strokeWidth="3" opacity="0.6" />
      {/* burner */}
      <circle cx="130" cy="90" r="34" stroke="currentColor" strokeWidth="3" />
      {/* flame ring marks */}
      <line x1="130" y1="52" x2="130" y2="40" stroke="currentColor" strokeWidth="2.5" />
      <line x1="102" y1="63" x2="93" y2="53" stroke="currentColor" strokeWidth="2.5" />
      <line x1="158" y1="63" x2="167" y2="53" stroke="currentColor" strokeWidth="2.5" />
      {/* ignition knob */}
      <circle cx="172" cy="100" r="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="164" y1="100" x2="156" y2="100" stroke="currentColor" strokeWidth="2" />
      {/* hose/connector */}
      <line x1="130" y1="124" x2="130" y2="150" stroke="currentColor" strokeWidth="3" />
      {/* fuel canister */}
      <ellipse cx="130" cy="150" rx="22" ry="6" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M108,150 L108,196 C108,203 118,208 130,208 C142,208 152,203 152,196 L152,150"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export const CAMP_STOVE_HOTSPOTS = [
  {
    id: "burner",
    x: 50,
    y: 41,
    label: "Burner head",
    description:
      "Where the flame comes out and heats your cookware. Keep it clear of debris for an even flame.",
  },
  {
    id: "wind-screen",
    x: 27,
    y: 45,
    label: "Wind screen",
    description:
      "Blocks wind from blowing out the flame or wasting fuel. Easy to forget, but it makes a real difference at exposed campsites.",
  },
  {
    id: "ignition",
    x: 66,
    y: 45,
    label: "Ignition knob",
    description:
      "Controls flame size and lights the stove. Know how yours works before you're hungry and it's dark.",
  },
  {
    id: "canister",
    x: 50,
    y: 82,
    label: "Fuel canister",
    description:
      "The actual fuel source — this is the piece people forget even when they remember the stove itself. Make sure it's the compatible type for your specific stove.",
  },
];
