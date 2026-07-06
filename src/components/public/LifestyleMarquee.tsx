import { ASSETS, LEGACY_ASSETS } from "@/lib/data/assetPaths";
import { OfficialAssetImage } from "./OfficialAssetImage";

const STRIP = [
  { src: ASSETS.lifestyle.wellnessOffice, fallback: LEGACY_ASSETS.lifestyle.wellnessOffice, alt: "WELLNESS au bureau" },
  { src: ASSETS.lifestyle.bloom, fallback: LEGACY_ASSETS.lifestyle.bloom, alt: "BLOOM rituel maternité" },
  { src: ASSETS.lifestyle.period, fallback: LEGACY_ASSETS.lifestyle.period, alt: "PERIOD! confort cycle" },
  { src: ASSETS.lifestyle.pulse, fallback: LEGACY_ASSETS.lifestyle.pulse, alt: "PULSE sport" },
  { src: ASSETS.lifestyle.calm, fallback: LEGACY_ASSETS.lifestyle.calm, alt: "CALM soirée" },
];

export function LifestyleMarquee() {
  const items = [...STRIP, ...STRIP];

  return (
    <section className="overflow-hidden border-y border-gold/15 bg-forest py-6" aria-hidden>
      <div className="marquee-track flex w-max gap-4">
        {items.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="relative h-28 w-44 shrink-0 overflow-hidden rounded-2xl border border-gold/25 shadow-lg md:h-36 md:w-56"
          >
            <OfficialAssetImage
              src={item.src}
              fallbackSrc={item.fallback}
              alt={item.alt}
              fill
              sizes="224px"
              className="object-cover opacity-90"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
