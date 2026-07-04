import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCT_COLORS } from "@/types/database";
import type { Product } from "@/types/database";
import { ProductPotImage } from "./ProductPotImage";

interface ProductCardProps {
  product: Product;
  showPreorder?: boolean;
}

export function ProductCard({ product, showPreorder = true }: ProductCardProps) {
  const colors = PRODUCT_COLORS[product.color_theme] ?? PRODUCT_COLORS.wellness;

  return (
    <article className="card-premium group flex flex-col overflow-hidden">
      <ProductPotImage
        product={product}
        size="md"
        className={cn(colors.bg, "!rounded-none !rounded-t-3xl")}
      />

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-gold">
          {product.mission}
        </p>
        <h3 className="mt-1 font-serif text-xl text-forest">{product.name}</h3>
        <p className="mt-2 text-sm text-foreground/60">
          {product.dominant_flavors.join(" • ")}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
          {product.short_description}
        </p>
        <p className="mt-2 text-xs text-foreground/50">Format : 500 g · ~30 portions</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/produits/${product.slug}`}
            className="btn-secondary flex-1 text-center text-xs sm:text-sm"
          >
            Voir le produit
            <ArrowRight size={14} />
          </Link>
          {showPreorder && (
            <Link
              href={`/precommande?produit=${product.slug}`}
              className="btn-primary flex-1 text-center text-xs sm:text-sm"
            >
              Précommander
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
