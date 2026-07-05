import Link from "next/link";
import { ASSETS } from "@/lib/data/assetPaths";
import type { Product } from "@/types/database";
import { OfficialAssetImage } from "./OfficialAssetImage";

export function HeroShowcase({ products }: { products: Product[] }) {
  return (
    <div className="relative">
      <Link
        href="/produits"
        className="group block overflow-hidden rounded-[2rem] border border-gold/20 bg-cream shadow-2xl transition-transform duration-300 hover:-translate-y-1"
      >
        <OfficialAssetImage
          src={ASSETS.heroRange}
          alt="BOVINIA — les 5 rituels nutritionnels"
          priority
          className="h-auto w-full object-contain"
        />
      </Link>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/produits/${product.slug}`}
            className="rounded-full border border-gold/25 bg-white/80 px-3 py-1 text-xs font-medium text-forest shadow-sm transition-colors hover:bg-gold/10"
          >
            {product.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
