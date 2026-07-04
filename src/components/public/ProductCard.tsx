import { cn } from "@/lib/utils";
import { PRODUCT_COLORS } from "@/types/database";
import type { Product } from "@/types/database";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  showPreorder?: boolean;
}

export function ProductCard({ product, showPreorder = true }: ProductCardProps) {
  const colors = PRODUCT_COLORS[product.color_theme] ?? PRODUCT_COLORS.wellness;

  return (
    <article className="card-premium group flex flex-col overflow-hidden">
      <div
        className={cn("relative flex h-48 items-end justify-center p-6", colors.bg)}
        style={{ backgroundColor: colors.accent + "33" }}
      >
        <div
          className="relative h-36 w-24 rounded-t-2xl rounded-b-lg shadow-xl transition-transform group-hover:-translate-y-2"
          style={{ backgroundColor: colors.accent }}
        >
          <div className="absolute inset-x-2 top-3 h-8 rounded bg-white/20" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-4">
            <span className="text-[10px] font-bold tracking-widest text-white/90">
              {product.name}
            </span>
          </div>
          <div
            className="absolute -top-2 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full"
            style={{ backgroundColor: colors.accent, filter: "brightness(0.85)" }}
          />
        </div>
      </div>

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
        <p className="mt-2 text-xs text-foreground/50">Format : 500 g</p>

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
