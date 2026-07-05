import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/database";
import { ProductPotImage } from "./ProductPotImage";

export const DISCOVERY_PACKS = [
  {
    id: "quotidien",
    name: "Rituel Quotidien",
    description: "Votre base bien-être au quotidien.",
    slugs: ["wellness"],
    price: 15000,
  },
  {
    id: "cycle",
    name: "Rituel Cycle",
    description: "PERIOD! et CALM pour accompagner le cycle et le soir.",
    slugs: ["period", "calm"],
    price: 28000,
  },
  {
    id: "sport",
    name: "Rituel Sport",
    description: "WELLNESS et PULSE pour énergie et récupération.",
    slugs: ["wellness", "pulse"],
    price: 28000,
  },
  {
    id: "maternite",
    name: "Rituel Maternité",
    description: "BLOOM et WELLNESS — grossesse et post-partum.",
    slugs: ["bloom", "wellness"],
    price: 28000,
  },
  {
    id: "decouverte",
    name: "Pack Découverte",
    description: "Les 5 rituels BOVINIA pour tester toute la gamme.",
    slugs: ["wellness", "bloom", "period", "pulse", "calm"],
    price: 68000,
    highlight: true,
  },
];

export function DiscoveryPacks({ products }: { products: Product[] }) {
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

  return (
    <section className="section-padding bg-cream">
      <div className="container-bovinia">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Offres</p>
          <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">Nos packs découverte</h2>
          <p className="mt-4 text-foreground/70">
            Composez votre routine ou testez toute la gamme à prix avantageux.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DISCOVERY_PACKS.map((pack) => {
            const packProducts = pack.slugs.map((s) => bySlug[s]).filter(Boolean);
            return (
              <article
                key={pack.id}
                className={`card-premium flex flex-col overflow-hidden ${pack.highlight ? "ring-2 ring-gold/40" : ""}`}
              >
                {pack.highlight && (
                  <div className="bg-gold px-4 py-1.5 text-center text-xs font-medium uppercase tracking-wider text-forest">
                    Meilleure valeur
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl text-forest">{pack.name}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{pack.description}</p>

                  <div className="mt-4 flex justify-center gap-2">
                    {packProducts.map((p) => (
                      <div key={p.slug} className="w-16">
                        <ProductPotImage product={p} size="sm" className="!h-24 !p-2" />
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 font-serif text-2xl text-forest">{formatPrice(pack.price)}</p>
                  <p className="text-xs text-foreground/50">
                    {pack.slugs.length} pot{pack.slugs.length > 1 ? "s" : ""} · 500 g chacun
                  </p>

                  <Link
                    href={`/precommande?pack=${pack.id}`}
                    className="btn-primary mt-5 text-center text-sm"
                  >
                    Précommander ce pack
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
