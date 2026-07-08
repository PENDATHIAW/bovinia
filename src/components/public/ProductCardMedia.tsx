import type { Product } from "@/types/database";
import { ProductPotImage } from "./ProductPotImage";
import { cn } from "@/lib/utils";

interface ProductCardMediaProps {
  product: Product;
  size?: "sm" | "md";
  className?: string;
}

const sizeClasses = {
  sm: "max-h-36",
  md: "max-h-72",
};

/** Carte produit — pot uniquement (léger, pas de double image). */
export function ProductCardMedia({ product, size = "md", className }: ProductCardMediaProps) {
  const hasGallery = product.gallery.length >= 1;

  return (
    <div className={cn("relative overflow-hidden bg-cream/40", className)}>
      <ProductPotImage
        product={product}
        size={size}
        className={cn("relative z-10 !bg-transparent", sizeClasses[size])}
      />
      {hasGallery && (
        <span className="absolute bottom-3 right-3 z-20 rounded-full border border-gold/30 bg-ivory/90 px-2.5 py-1 text-[10px] font-medium text-forest shadow-sm">
          Voir comment préparer
        </span>
      )}
    </div>
  );
}
