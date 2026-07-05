import { cn } from "@/lib/utils";
import type { Product } from "@/types/database";
import { BoviniaPotLabel, getPotAccent } from "./BoviniaPotLabel";

interface ProductPotImageProps {
  product: Pick<Product, "name" | "mission" | "color_theme" | "dominant_flavors" | "image">;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { container: "h-44", pot: "h-36" },
  md: { container: "h-64", pot: "h-52" },
  lg: { container: "h-80 md:h-96", pot: "h-72 md:h-80" },
};

/** Pot officiel BOVINIA — packaging cylindrique 500 g */
export function ProductPotImage({ product, size = "md", className }: ProductPotImageProps) {
  const { container, pot } = sizeMap[size];
  const accent = getPotAccent(product.color_theme);

  return (
    <div
      className={cn(
        "relative flex items-end justify-center rounded-3xl px-4 pb-2 pt-8",
        container,
        className
      )}
      style={{
        background: `linear-gradient(180deg, ${accent}12 0%, ${accent}28 100%)`,
      }}
    >
      <BoviniaPotLabel product={product} className={pot} />
    </div>
  );
}
