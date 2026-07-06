import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";
import { isProductOrderable } from "@/lib/product-availability";

interface ProductPersuasionBandProps {
  product: Product;
}

/** Bandeau conversion après la galerie — rappel prix + ajout panier */
export function ProductPersuasionBand({ product }: ProductPersuasionBandProps) {
  if (!isProductOrderable(product.status) || !product.price) return null;

  return (
    <section className="mt-12 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-r from-cream via-ivory to-cream shadow-sm">
      <div className="flex flex-col items-center justify-between gap-5 p-6 sm:flex-row sm:p-8">
        <div className="text-center sm:text-left">
          <p className="text-xs font-medium uppercase tracking-wider text-gold">Prête à essayer ?</p>
          <p className="mt-1 font-serif text-2xl text-forest">
            {product.name} — {formatPrice(product.price)}
          </p>
          <p className="mt-1 text-sm text-foreground/60">500 g · ~30 portions · livraison au Sénégal</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <AddToCartButton product={product} variant="gold" openDrawerOnAdd />
          <Link href="/commander" className="btn-secondary">
            <ShoppingBag size={16} />
            Voir le panier
          </Link>
        </div>
      </div>
    </section>
  );
}
