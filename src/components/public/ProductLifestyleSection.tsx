import type { Product } from "@/types/database";
import { isBlockedAsset } from "@/lib/data/assetPaths";
import { OfficialAssetImage } from "./OfficialAssetImage";

interface ProductLifestyleSectionProps {
  product: Product;
}

export function ProductLifestyleSection({ product }: ProductLifestyleSectionProps) {
  const images = (product.gallery.length > 0 ? product.gallery : product.image ? [product.image] : [])
    .filter((src) => !isBlockedAsset(src));
  if (images.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Rituel en image</p>
        <h2 className="mt-2 font-serif text-3xl text-forest">{product.name} au quotidien</h2>
        <p className="mt-3 text-foreground/70">
          Des visuels officiels BOVINIA, sans recreation automatique ni formule confidentielle.
        </p>
      </div>

      <div className={images.length > 1 ? "grid gap-6 md:grid-cols-2" : ""}>
        {images.map((src, index) => (
          <div
            key={`${product.slug}-${index}`}
            className="overflow-hidden rounded-3xl border border-gold/20 bg-cream shadow-lg"
          >
            <OfficialAssetImage
              src={src}
              alt={`${product.name} BOVINIA - rituel ${index + 1}`}
              className="mx-auto h-auto w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
