import type { Product } from "@/types/database";
import { OfficialAssetImage } from "./OfficialAssetImage";

interface ProductLifestyleSectionProps {
  product: Product;
}

export function ProductLifestyleSection({ product }: ProductLifestyleSectionProps) {
  const officialSrc = product.gallery[0] ?? product.image;
  if (!officialSrc) return null;

  return (
    <section className="mt-16">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Visuel officiel</p>
        <h2 className="mt-2 font-serif text-3xl text-forest">{product.name} BOVINIA</h2>
        <p className="mt-3 text-foreground/70">
          Un rituel premium a base de Bone Broth, pense pour votre quotidien.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gold/20 bg-cream shadow-lg">
        <OfficialAssetImage
          src={officialSrc}
          alt={`${product.name} BOVINIA - visuel officiel`}
          className="mx-auto h-auto w-full max-w-3xl object-contain p-6 md:p-10"
        />
      </div>
    </section>
  );
}
