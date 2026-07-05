import Link from "next/link";
import { ASSETS } from "@/lib/data/assetPaths";
import type { Product } from "@/types/database";
import { OfficialAssetImage } from "./OfficialAssetImage";

export function HeroShowcase({ products }: { products: Product[] }) {
  return (
    <div className="relative animate-gentle-float">
      <div className="gold-frame">
        <Link
          href="/produits"
          className="gold-frame-inner group block transition-transform duration-300 hover:scale-[1.01]"
        >
          <OfficialAssetImage
            src={ASSETS.heroRange}
            alt="BOVINIA — les 5 rituels nutritionnels"
            priority
            className="h-auto w-full object-contain"
          />
        </Link>
      </div>

      <div className="absolute -bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full border border-gold/30 bg-ivory/95 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gold shadow-sm md:block">
        5 rituels · 500 g
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/produits/${product.slug}`}
            className="rounded-full border border-gold/25 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-forest shadow-sm transition-all hover:border-gold hover:bg-gold/10 hover:shadow-md"
          >
            {product.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
