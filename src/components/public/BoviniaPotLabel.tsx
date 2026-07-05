import { cn } from "@/lib/utils";
import type { Product } from "@/types/database";
import { PRODUCT_COLORS } from "@/types/database";

interface BoviniaPotLabelProps {
  product: Pick<Product, "name" | "mission" | "color_theme" | "dominant_flavors">;
  className?: string;
}

const POT_COLORS: Record<string, { body: string; lid: string }> = {
  wellness: { body: "#5C6B52", lid: "#D4C4A8" },
  bloom: { body: "#B8847A", lid: "#D4C4A8" },
  period: { body: "#722F37", lid: "#D4C4A8" },
  pulse: { body: "#C45C26", lid: "#D4C4A8" },
  calm: { body: "#1B2A4A", lid: "#D4C4A8" },
};

/** Pot officiel BOVINIA — packaging cylindrique 500 g */
export function BoviniaPotLabel({ product, className }: BoviniaPotLabelProps) {
  const colors = POT_COLORS[product.color_theme] ?? POT_COLORS.wellness;
  const flavors = product.dominant_flavors.slice(0, 4).join(" • ").toUpperCase();

  return (
    <svg
      viewBox="0 0 200 320"
      className={cn("h-full w-auto drop-shadow-2xl", className)}
      role="img"
      aria-label={`Pot ${product.name} BOVINIA`}
    >
      <ellipse cx="100" cy="28" rx="72" ry="14" fill={colors.lid} />
      <rect x="28" y="28" width="144" height="18" fill={colors.lid} />
      <rect x="32" y="46" width="136" height="248" rx="4" fill={colors.body} />
      <ellipse cx="100" cy="294" rx="68" ry="12" fill={colors.body} opacity="0.85" />

      <text
        x="100"
        y="72"
        textAnchor="middle"
        fill="#C9A962"
        fontFamily="Georgia, serif"
        fontSize="11"
        fontWeight="600"
        letterSpacing="1"
      >
        BOVINIA
      </text>
      <text x="100" y="84" textAnchor="middle" fill="#C9A962" fontSize="5" letterSpacing="1.2">
        POWERED BY BONE BROTH
      </text>

      <text
        x="100"
        y="130"
        textAnchor="middle"
        fill="white"
        fontFamily="Georgia, serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="1"
      >
        {product.name}
      </text>
      <text x="100" y="152" textAnchor="middle" fill="white" fontSize="8" opacity="0.92">
        {product.mission}
      </text>

      <rect
        x="24"
        y="248"
        width="152"
        height="22"
        rx="11"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.85"
      />
      <text x="100" y="263" textAnchor="middle" fill="white" fontSize="6.5" letterSpacing="0.5">
        {flavors}
      </text>
      <text x="100" y="285" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">
        500g
      </text>
    </svg>
  );
}

export function getPotAccent(colorTheme: string) {
  return PRODUCT_COLORS[colorTheme]?.accent ?? PRODUCT_COLORS.wellness.accent;
}
