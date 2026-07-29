/**
 * Large decorative line-art mountain range with a winding trail, used to fill empty
 * space on the landing/plan pages and reinforce the outdoors visual identity.
 * Purely decorative — aria-hidden, no semantic content.
 */
export function DecorativeMountains({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" aria-hidden="true" className={className}>
      {/* back range */}
      <path
        d="M-20,320 L60,220 L120,280 L190,180 L260,300 L320,240 L400,320 L520,260 L520,500 L-20,500 Z"
        fill="currentColor"
        opacity="0.06"
      />
      {/* front range */}
      <path
        d="M-20,380 L40,300 L100,350 L170,260 L230,360 L300,300 L370,380 L440,330 L520,390 L520,500 L-20,500 Z"
        fill="currentColor"
        opacity="0.1"
      />
      {/* front range outline */}
      <path
        d="M-20,380 L40,300 L100,350 L170,260 L230,360 L300,300 L370,380 L440,330 L520,390"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.5"
      />
      {/* winding trail */}
      <path
        d="M60,500 C90,440 40,400 80,350 C120,300 70,260 110,210 C150,160 120,120 160,70"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* trail marker pin */}
      <circle cx="160" cy="70" r="8" fill="currentColor" opacity="0.7" />
      <circle cx="160" cy="70" r="14" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}
