import { cn } from "@/lib/utils";
import type { Product } from "@/types/database";
import { OfficialAssetImage } from "./OfficialAssetImage";

interface ProductPotImageProps {
  product: Pick<Product, "name" | "mission" | "image">;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
  priority?: boolean;
}

const sizeClasses = {
  sm: "max-h-36 w-full",
  md: "max-h-72 w-full",
  lg: "max-h-[32rem] w-full",
  full: "w-full h-auto",
};

/** Pot officiel — fichier PNG tel quel, fond neutre, jamais recoloré. */
export function ProductPotImage({
  product,
  size = "md",
  className,
  priority = false,
}: ProductPotImageProps) {
  if (!product.image) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-cream/30 p-2",
        className
      )}
    >
      <OfficialAssetImage
        src={product.image}
        alt={`${product.name} — ${product.mission}`}
        priority={priority}
        className={cn(
          "h-auto object-contain drop-shadow-lg",
          sizeClasses[size]
        )}
      />
    </div>
  );
}
