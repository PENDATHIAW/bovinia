import { cn } from "@/lib/utils";

interface BoviniaLogoMarkProps {
  className?: string;
  variant?: "full" | "icon";
  gold?: string;
}

function BoneIcon({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="4" y="10" width="6" height="18" rx="3" fill={fill} />
      <ellipse cx="7" cy="8" rx="5" ry="4" fill={fill} />
      <ellipse cx="7" cy="30" rx="5" ry="4" fill={fill} />
    </g>
  );
}

/** Logo officiel BOVINIA — monogramme B (tête de bœuf + feuille), I en os */
export function BoviniaLogoMark({
  className,
  variant = "full",
  gold = "#C9A962",
}: BoviniaLogoMarkProps) {
  if (variant === "icon") {
    return (
      <svg viewBox="0 0 72 88" className={cn("h-auto w-full", className)} aria-hidden>
        <MonogramB gold={gold} x={4} y={4} scale={0.55} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 180"
      className={cn("h-auto w-full max-w-[280px]", className)}
      role="img"
      aria-label="BOVINIA — Powered by Bone Broth"
    >
      <MonogramB gold={gold} x={108} y={8} scale={1} />

      <text
        x="42"
        y="108"
        fill={gold}
        fontFamily="Georgia, 'Playfair Display', serif"
        fontSize="36"
        fontWeight="600"
        letterSpacing="5"
      >
        BOV
      </text>
      <BoneIcon x={138} y={82} fill={gold} />
      <text
        x="158"
        y="108"
        fill={gold}
        fontFamily="Georgia, 'Playfair Display', serif"
        fontSize="36"
        fontWeight="600"
        letterSpacing="5"
      >
        NIA
      </text>

      <text
        x="150"
        y="128"
        textAnchor="middle"
        fill={gold}
        fontFamily="system-ui, sans-serif"
        fontSize="9.5"
        letterSpacing="3.5"
      >
        POWERED BY BONE BROTH
      </text>

      <line x1="70" y1="144" x2="118" y2="144" stroke={gold} strokeWidth="0.7" opacity="0.75" />
      <ellipse cx="150" cy="144" rx="9" ry="3.5" stroke={gold} strokeWidth="0.9" fill="none" />
      <line x1="182" y1="144" x2="230" y2="144" stroke={gold} strokeWidth="0.7" opacity="0.75" />
    </svg>
  );
}

function MonogramB({ gold, x, y, scale }: { gold: string; x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <path
        d="M4 4h56c22 0 40 18 40 40 0 18-10 32-24 38 16 6 28 22 28 40 0 24-20 44-44 44H4V4z"
        fill={gold}
      />
      <path
        d="M26 24c-10 4-16 14-16 24 0 8 4 14 10 18-8 4-14 12-14 20 0 12 10 22 24 22h16V24H26z"
        fill="#FAF7F2"
      />
      <path
        d="M18 52c0-14 12-26 26-26 8 0 14 4 18 10-4 14-14 24-28 24-8 0-14-4-16-8z"
        fill={gold}
      />
      <ellipse cx="44" cy="42" rx="4" ry="5" fill="#FAF7F2" />
      <path
        d="M52 98c-4 0-7 3-7 6.5s3 6.5 7 6.5 7-3 7-6.5-3-6.5-7-6.5z"
        fill="#FAF7F2"
      />
      <path d="M49 105c0-4 3-7 6.5-7" stroke="#FAF7F2" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}
