import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/database";

interface ProductPotImageProps {
  product: Pick<Product, "name" | "mission" | "image">;
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
}

const sizeMap = {
  sm: { width: 160, height: 220, container: "min-h-44" },
  md: { width: 240, height: 320, container: "min-h-64" },
  lg: { width: 480, height: 640, container: "min-h-80 md:min-h-[28rem]" },
};

/** Affiche uniquement le visuel officiel du pot (PNG fourni par la marque). */
export function ProductPotImage({
  product,
  size = "md",
  className,
  priority = false,
}: ProductPotImageProps) {
  const { width, height, container } = sizeMap[size];

  if (!product.image) return null;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        container,
        className
      )}
    >
      <Image
        src={product.image}
        alt={`${product.name} — ${product.mission}`}
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-full max-w-full object-contain drop-shadow-xl"
        sizes={
          size === "lg"
            ? "(max-width: 768px) 90vw, 480px"
            : size === "md"
              ? "(max-width: 768px) 50vw, 240px"
              : "120px"
        }
      />
    </div>
  );
}
