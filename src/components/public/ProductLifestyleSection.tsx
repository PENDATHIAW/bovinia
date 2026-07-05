import Image from "next/image";
import type { Product } from "@/types/database";
import { BoviniaPotLabel } from "./BoviniaPotLabel";

interface ProductLifestyleSectionProps {
  product: Product;
}

export function ProductLifestyleSection({ product }: ProductLifestyleSectionProps) {
  const lifestyleSrc = product.gallery[0];

  return (
    <section className="mt-16">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Votre rituel</p>
        <h2 className="mt-2 font-serif text-3xl text-forest">
          {product.name} au quotidien
        </h2>
        <p className="mt-3 text-foreground/70">
          Préparez votre boisson chaude ou fraîche — 15 à 17 g dans 200 ml de liquide.
        </p>
      </div>

      {lifestyleSrc ? (
        <div className="overflow-hidden rounded-3xl border border-gold/20 shadow-lg">
          <Image
            src={lifestyleSrc}
            alt={`${product.name} BOVINIA — mise en situation`}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
        </div>
      ) : (
        <div className="flex justify-center rounded-3xl bg-cream p-12">
          <BoviniaPotLabel product={product} className="h-72" />
        </div>
      )}
    </section>
  );
}
