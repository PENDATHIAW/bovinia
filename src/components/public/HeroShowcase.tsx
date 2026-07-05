import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/database";
import { OfficialAssetImage } from "./OfficialAssetImage";

export function HeroShowcase({ products }: { products: Product[] }) {
  return (
    <div className="relative flex items-end justify-center gap-3 sm:gap-4">
      {products.map((product, i) => {
        if (!product.image) return null;

        return (
          <Link
            key={product.id}
            href={`/produits/${product.slug}`}
            className={cn(
              "transition-transform duration-300 hover:-translate-y-2 hover:scale-105",
              i === 2 && "z-10 scale-110"
            )}
          >
            <OfficialAssetImage
              src={product.image}
              alt={product.name}
              priority={i === 2}
              className={cn(
                "h-auto object-contain drop-shadow-2xl",
                i === 2 ? "max-h-52 sm:max-h-64" : "max-h-40 sm:max-h-52"
              )}
            />
          </Link>
        );
      })}
    </div>
  );
}
