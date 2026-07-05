"use client";

import { cn } from "@/lib/utils";
import { PRODUCT_COLORS } from "@/types/database";
import type { Product } from "@/types/database";
import { ProductImage } from "./ProductImage";
import { ProductPotPlaceholder } from "./ProductPotPlaceholder";

interface ProductPotImageProps {
  product: Pick<Product, "name" | "mission" | "color_theme" | "image">;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { width: 120, height: 160, container: "h-40" },
  md: { width: 200, height: 260, container: "h-64" },
  lg: { width: 280, height: 360, container: "h-80 md:h-96" },
};

export function ProductPotImage({ product, size = "md", className }: ProductPotImageProps) {
  const colors = PRODUCT_COLORS[product.color_theme] ?? PRODUCT_COLORS.wellness;
  const { width, height, container } = sizeMap[size];

  const placeholder = (
    <ProductPotPlaceholder
      name={product.name}
      mission={product.mission}
      colorTheme={product.color_theme}
      size={size}
      className="h-full w-full !rounded-3xl"
    />
  );

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-3xl p-4",
        container,
        className
      )}
      style={{ backgroundColor: `${colors.accent}08` }}
    >
      <ProductImage
        src={product.image}
        alt={`${product.name} — ${product.mission}`}
        width={width}
        height={height}
        className="h-full w-auto max-w-full object-contain drop-shadow-xl"
        fallback={placeholder}
      />
    </div>
  );
}
