import type { Product } from "@/types/database";
import { ProductPotImage } from "./ProductPotImage";
import { OfficialAssetImage } from "./OfficialAssetImage";
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

/**
 * Carte produit : pot en premier plan + aperçu lifestyle en arrière-plan si disponible.
 */
export function ProductCardMedia({ product, size = "md", className }: ProductCardMediaProps) {
  const illustration = product.gallery[0] ?? null;
  const hasGallery = product.gallery.length > 1;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {illustration && (
        <div className="absolute inset-0">
          <OfficialAssetImage
            src={illustration}
            alt=""
            className="h-full w-full object-cover opacity-25 blur-[1px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/40 to-cream/80" />
        </div>
      )}
      <ProductPotImage
        product={product}
        size={size}
        className={cn("relative z-10 !bg-transparent", sizeClasses[size])}
      />
      {hasGallery && (
        <span className="absolute bottom-3 right-3 z-20 rounded-full border border-gold/30 bg-ivory/90 px-2.5 py-1 text-[10px] font-medium text-forest shadow-sm">
          +{product.gallery.length} visuels
        </span>
      )}
    </div>
  );
}
