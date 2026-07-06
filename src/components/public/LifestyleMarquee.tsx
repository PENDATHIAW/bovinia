import { ASSETS, LEGACY_ASSETS } from "@/lib/data/assetPaths";
import { OfficialAssetImage } from "./OfficialAssetImage";

const DEFAULT_STRIP = [
  { src: ASSETS.lifestyle.wellnessOffice, fallback: LEGACY_ASSETS.lifestyle.wellnessOffice, alt: "WELLNESS au bureau" },
  { src: ASSETS.lifestyle.wellnessFresh, fallback: LEGACY_ASSETS.lifestyle.wellnessFresh, alt: "WELLNESS en cuisine" },
  { src: ASSETS.lifestyle.bloom, fallback: LEGACY_ASSETS.lifestyle.bloom, alt: "BLOOM rituel maternité" },
  { src: ASSETS.lifestyle.period, fallback: LEGACY_ASSETS.lifestyle.period, alt: "PERIOD! confort cycle" },
  { src: ASSETS.lifestyle.pulse, fallback: LEGACY_ASSETS.lifestyle.pulse, alt: "PULSE sport" },
  { src: ASSETS.lifestyle.calm, fallback: LEGACY_ASSETS.lifestyle.calm, alt: "CALM soirée" },
];

interface LifestyleMarqueeProps {
  /** Images supplémentaires lues depuis public/assets/products/ */
  extraItems?: { src: string; alt: string; fallback?: string }[];
}

export function LifestyleMarquee({ extraItems = [] }: LifestyleMarqueeProps) {
  const seen = new Set<string>();
  const strip = [...DEFAULT_STRIP, ...extraItems].filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
  const items = [...strip, ...strip];

  return (
    <section className="overflow-hidden border-y border-gold/15 bg-forest py-6" aria-hidden>
      <div className="marquee-track flex w-max gap-4">
        {items.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="h-28 w-44 shrink-0 overflow-hidden rounded-2xl border border-gold/25 shadow-lg md:h-36 md:w-56"
          >
            <OfficialAssetImage
              src={item.src}
              fallbackSrc={"fallback" in item ? item.fallback : undefined}
              alt={item.alt}
              className="h-full w-full object-cover opacity-90"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
