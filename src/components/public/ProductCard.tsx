import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCT_COLORS } from "@/types/database";
import type { Product } from "@/types/database";
import { ProductPotImage } from "./ProductPotImage";
import { formatPrice } from "@/lib/utils";
import { getProductAvailabilityLabel, isProductOrderable } from "@/lib/product-availability";

interface ProductCardProps {
  product: Product;
  showOrder?: boolean;
}

export function ProductCard({ product, showOrder = true }: ProductCardProps) {
  const colors = PRODUCT_COLORS[product.color_theme] ?? PRODUCT_COLORS.wellness;
  const orderable = isProductOrderable(product.status);

  return (
    <article className="card-premium group flex flex-col overflow-hidden">
      <ProductPotImage
        product={product}
        size="md"
        className={cn(colors.bg, "!rounded-none !rounded-t-3xl")}
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gold">{product.mission}</p>
          <span className="shrink-0 rounded-full bg-forest/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-forest">
            {getProductAvailabilityLabel(product.status)}
          </span>
        </div>
        <h3 className="mt-1 font-serif text-xl text-forest">{product.name}</h3>
        <p className="mt-2 text-sm text-foreground/60">{product.dominant_flavors.join(" • ")}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
          {product.short_description}
        </p>
        <p className="mt-3 font-serif text-lg text-forest">
          {product.price ? formatPrice(product.price) : "—"}
        </p>
        <p className="text-xs text-foreground/50">Format : 500 g · ~30 portions</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/produits/${product.slug}`}
            className="btn-secondary flex-1 text-center text-xs sm:text-sm"
          >
            Voir le produit
            <ArrowRight size={14} />
          </Link>
          {showOrder && orderable && (
            <Link
              href={`/commander?produit=${product.slug}`}
              className="btn-primary flex-1 text-center text-xs sm:text-sm"
            >
              Commander
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
