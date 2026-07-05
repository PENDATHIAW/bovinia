import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_MIN } from "@/lib/shop/cart";

export function ConversionStrip() {
  return (
    <section className="border-y border-gold/20 bg-forest py-8 text-ivory">
      <div className="container-bovinia flex flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Disponible maintenant
          </p>
          <p className="mt-1 font-serif text-xl md:text-2xl">
            {formatPrice(15000)} le pot · livraison offerte dès {formatPrice(FREE_SHIPPING_MIN)}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/produits" className="btn-gold">
            Voir la gamme
            <ArrowRight size={16} />
          </Link>
          <Link href="/commander" className="btn-secondary border-gold/40 text-ivory hover:bg-gold/10">
            <ShoppingBag size={16} />
            Commander
          </Link>
        </div>
      </div>
    </section>
  );
}
