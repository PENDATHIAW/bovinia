import { ASSETS } from "@/lib/data/assetPaths";
import { OfficialAssetImage } from "./OfficialAssetImage";

const DEFAULT_STRIP = [
  { src: ASSETS.lifestyle.wellnessOffice, alt: "WELLNESS au bureau" },
  { src: ASSETS.lifestyle.wellnessFresh, alt: "WELLNESS en cuisine" },
  { src: ASSETS.lifestyle.bloom, alt: "BLOOM rituel maternité" },
  { src: ASSETS.lifestyle.period, alt: "PERIOD! confort cycle" },
  { src: ASSETS.lifestyle.pulse, alt: "PULSE sport" },
  { src: ASSETS.lifestyle.calm, alt: "CALM soirée" },
];

interface LifestyleMarqueeProps {
  /** Images supplémentaires lues depuis public/assets/auto/marquee/ */
  extraItems?: { src: string; alt: string }[];
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
              alt={item.alt}
              className="h-full w-full object-cover opacity-90"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
