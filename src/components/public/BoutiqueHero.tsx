import { ASSETS, LEGACY_ASSETS } from "@/lib/data/assetPaths";
import { OfficialAssetImage } from "./OfficialAssetImage";
import { GoldOrnament } from "./GoldOrnament";
import { formatPrice } from "@/lib/utils";

interface BoutiqueHeroProps {
  title?: string;
  description?: string;
}

/** En-tête boutique — visuel gamme en premier, texte en dessous */
export function BoutiqueHero({
  title = "Nos rituels nutritionnels",
  description = `5 formules premium — ${formatPrice(15000)} le pot · 500 g · ~30 portions · Bone Broth fabriqué au Sénégal.`,
}: BoutiqueHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-gold/15 bg-cream/30 pattern-dots">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-forest/5 blur-3xl" />
      </div>

      <div className="container-bovinia relative px-4 pb-12 pt-8 sm:px-6 md:pb-16 md:pt-10 lg:px-8">
        {/* Visuel des 5 pots — plein cadre, sans marge intérieure */}
        <div className="gold-frame mx-auto w-full max-w-6xl">
          <div className="gold-frame-inner w-full">
            <OfficialAssetImage
              src={ASSETS.heroRange}
              fallbackSrc={LEGACY_ASSETS.heroRange}
              alt="BOVINIA — les 5 rituels : WELLNESS, BLOOM, PERIOD!, PULSE et CALM"
              priority
              width={1448}
              height={1086}
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="section-label">Boutique</p>
          <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            {title}
          </h1>
          <GoldOrnament className="my-6" />
          <p className="text-lg leading-relaxed text-foreground/70">{description}</p>
        </div>
      </div>
    </section>
  );
}
