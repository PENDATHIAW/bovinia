import type { Product } from "@/types/database";
import { OfficialAssetImage } from "./OfficialAssetImage";

interface ProductLifestyleSectionProps {
  product: Product;
}

/** Photo lifestyle officielle — fichier PNG entier, sans recadrage. */
export function ProductLifestyleSection({ product }: ProductLifestyleSectionProps) {
  const lifestyleSrc = product.gallery[0];
  if (!lifestyleSrc) return null;

  return (
    <section className="mt-16">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Votre rituel</p>
        <h2 className="mt-2 font-serif text-3xl text-forest">{product.name} au quotidien</h2>
        <p className="mt-3 text-foreground/70">
          Préparez votre boisson chaude ou fraîche — 15 à 17 g dans 200 ml de liquide.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gold/20 bg-cream shadow-lg">
        <OfficialAssetImage
          src={lifestyleSrc}
          alt={`${product.name} BOVINIA — mise en situation`}
          className="mx-auto h-auto w-full max-w-full object-contain"
        />
      </div>
    </section>
  );
}
