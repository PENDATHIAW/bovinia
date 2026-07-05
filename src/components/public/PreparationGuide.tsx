import Link from "next/link";
import { Flame, Droplets, Clock, Thermometer, ArrowRight } from "lucide-react";
import type { Product } from "@/types/database";
import {
  CONSUMPTION_BY_SLUG,
  HOT_CONSUMPTION_NOTE,
  RATING_LABELS,
  RATING_STARS,
  UNIVERSAL_PREPARATION,
  USAGE_TIME_BY_SLUG,
} from "@/lib/data/consumption";
import { ProductPotImage } from "./ProductPotImage";
import { OfficialAssetImage } from "./OfficialAssetImage";
import { ASSETS } from "@/lib/data/assetPaths";

const TIPS = [
  {
    icon: Thermometer,
    title: "Eau chaude, pas bouillante",
    desc: "Viser 70–80 °C pour préserver les arômes et le confort en bouche.",
  },
  {
    icon: Droplets,
    title: "200 ml par portion",
    desc: "Ajustez selon votre texture préférée — plus liquide ou plus onctueux.",
  },
  {
    icon: Clock,
    title: "1 à 2 portions / jour",
    desc: "Une routine régulière vaut mieux qu'une dose ponctuelle.",
  },
  {
    icon: Flame,
    title: "Chaud recommandé",
    desc: "Tous les rituels se dégustent au chaud — et aussi frais selon la formule.",
  },
];

export function PreparationGuide({ products }: { products: Product[] }) {
  return (
    <div className="space-y-16">
      {/* Étapes universelles */}
      <section>
        <h2 className="font-serif text-2xl text-forest md:text-3xl">Les 3 étapes</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/60">
          {UNIVERSAL_PREPARATION.portion} · {UNIVERSAL_PREPARATION.liquid} ·{" "}
          {UNIVERSAL_PREPARATION.portionsPerPot}
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {UNIVERSAL_PREPARATION.steps.map((step, i) => (
            <li key={step} className="card-premium relative overflow-hidden p-6 pt-10">
              <span className="absolute right-4 top-4 font-serif text-4xl text-gold/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-foreground/75">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Visuel */}
      <section className="gold-frame">
        <div className="gold-frame-inner grid lg:grid-cols-2">
          <OfficialAssetImage
            src={ASSETS.lifestyle.wellnessFresh}
            alt="Préparation BOVINIA en cuisine"
            className="h-56 w-full object-cover lg:h-full"
          />
          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="section-label">Rituel chaud</p>
            <p className="mt-2 font-serif text-xl text-forest">{HOT_CONSUMPTION_NOTE}</p>
            <Link href="/comparateur" className="btn-secondary mt-6 inline-flex w-fit text-sm">
              Comparer les rituels
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Conseils */}
      <section>
        <h2 className="font-serif text-2xl text-forest">Conseils pratiques</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIPS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-premium p-5">
              <Icon size={22} className="text-gold" />
              <p className="mt-3 text-sm font-medium text-forest">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Par rituel */}
      <section>
        <h2 className="font-serif text-2xl text-forest md:text-3xl">
          Meilleure préparation par rituel
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Chaque formule a ses modes de dégustation optimaux — chaud ou frais.
        </p>
        <div className="mt-8 space-y-6">
          {products.map((product) => {
            const options = CONSUMPTION_BY_SLUG[product.slug] ?? [];
            const usage = USAGE_TIME_BY_SLUG[product.slug];

            return (
              <article
                key={product.id}
                className="card-premium overflow-hidden border-l-4 border-l-gold/40"
              >
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start">
                  <div className="w-28 shrink-0">
                    <ProductPotImage product={product} size="sm" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gold">
                          {product.mission}
                        </p>
                        <h3 className="font-serif text-xl text-forest">{product.name}</h3>
                      </div>
                      {usage && (
                        <span className="rounded-full border border-gold/25 bg-cream px-3 py-1 text-xs text-forest">
                          {usage.label}
                        </span>
                      )}
                    </div>
                    {usage && (
                      <p className="mt-2 text-sm text-foreground/60">{usage.detail}</p>
                    )}
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {options.map((opt) => (
                        <li
                          key={opt.method}
                          className="flex items-center justify-between rounded-xl border border-gold/15 bg-ivory px-4 py-2.5 text-sm"
                        >
                          <span className="text-forest">{opt.method}</span>
                          <span className="text-xs font-medium text-gold">
                            {"★".repeat(RATING_STARS[opt.rating])}
                            <span className="sr-only">{RATING_LABELS[opt.rating]}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/produits/${product.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
                    >
                      Voir la fiche {product.name}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
