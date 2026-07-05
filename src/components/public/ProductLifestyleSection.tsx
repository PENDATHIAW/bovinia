import { Flame, Clock } from "lucide-react";
import { PRODUCT_COLORS } from "@/types/database";
import type { Product } from "@/types/database";
import { LifestyleImage } from "./ProductImage";
import { USAGE_TIME_BY_SLUG } from "@/lib/data/consumption";

interface ProductLifestyleSectionProps {
  product: Product;
}

function LifestylePlaceholder({ product }: { product: Product }) {
  const colors = PRODUCT_COLORS[product.color_theme] ?? PRODUCT_COLORS.wellness;
  const usage = USAGE_TIME_BY_SLUG[product.slug];

  return (
    <div
      className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-3xl px-8 py-16 text-center md:min-h-[360px]"
      style={{
        background: `linear-gradient(135deg, ${colors.accent}18 0%, #FAF7F2 50%, ${colors.accent}10 100%)`,
      }}
    >
      <div
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20"
        style={{ backgroundColor: colors.accent }}
      />
      <div
        className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-15"
        style={{ backgroundColor: colors.accent }}
      />

      <p className="relative text-sm font-medium uppercase tracking-widest text-gold">
        Votre rituel {product.name}
      </p>
      <p className="relative mt-3 max-w-md font-serif text-2xl text-forest md:text-3xl">
        {product.dominant_flavors.join(" · ")}
      </p>
      <p className="relative mt-4 max-w-lg text-sm leading-relaxed text-foreground/65">
        {product.short_description}
      </p>

      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        {usage && (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-forest shadow-sm">
            <Clock size={14} className="text-gold" />
            {usage.label}
          </span>
        )}
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-forest shadow-sm">
          <Flame size={14} className="text-gold" />
          Se déguste chaud
        </span>
      </div>

      <p className="relative mt-6 text-xs text-foreground/45">
        Photo lifestyle à venir — 15 à 17 g · 200 ml · ~30 portions par pot
      </p>
    </div>
  );
}

export function ProductLifestyleSection({ product }: ProductLifestyleSectionProps) {
  const lifestyleSrc = product.gallery[0];

  return (
    <section className="mt-16">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Votre rituel</p>
        <h2 className="mt-2 font-serif text-3xl text-forest">{product.name} au quotidien</h2>
        <p className="mt-3 text-foreground/70">
          Préparez votre boisson chaude ou fraîche — 15 à 17 g dans 200 ml de liquide.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gold/20 shadow-lg">
        <LifestyleImage
          src={lifestyleSrc}
          alt={`${product.name} BOVINIA — mise en situation`}
          fallback={<LifestylePlaceholder product={product} />}
        />
      </div>
    </section>
  );
}
