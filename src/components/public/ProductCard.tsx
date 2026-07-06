import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/database";
import { ProductCardMedia } from "./ProductCardMedia";
import { AddToCartButton } from "./AddToCartButton";
import { formatPrice } from "@/lib/utils";
import { getProductAvailabilityLabel, isProductOrderable } from "@/lib/product-availability";

interface ProductCardProps {
  product: Product;
  showOrder?: boolean;
}

export function ProductCard({ product, showOrder = true }: ProductCardProps) {
  const orderable = isProductOrderable(product.status);

  return (
    <article className="card-premium card-lift group flex flex-col overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <ProductCardMedia
          product={product}
          size="md"
          className="image-zoom !rounded-none !rounded-t-3xl"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gold">{product.mission}</p>
          <span className="shrink-0 rounded-full border border-gold/20 bg-cream px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-forest">
            {getProductAvailabilityLabel(product.status)}
          </span>
        </div>
        <h3 className="mt-1 font-serif text-xl text-forest transition-colors group-hover:text-forest-light">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-foreground/60">{product.dominant_flavors.join(" • ")}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70 line-clamp-3">
          {product.short_description}
        </p>
        <div className="mt-4 border-t border-gold/10 pt-4">
          <p className="font-serif text-xl text-forest">
            {product.price ? formatPrice(product.price) : "—"}
          </p>
          <p className="text-xs text-foreground/50">500 g · ~30 portions</p>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={`/produits/${product.slug}`}
            className="btn-secondary w-full text-center text-xs sm:text-sm"
          >
            Voir le produit
            <ArrowRight size={14} />
          </Link>
          {showOrder && orderable && (
            <AddToCartButton
              product={product}
              variant="gold"
              size="sm"
              openDrawerOnAdd
              className="w-full [&_button]:w-full"
            />
          )}
        </div>
      </div>
    </article>
  );
}
