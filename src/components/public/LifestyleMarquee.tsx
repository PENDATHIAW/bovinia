import { ASSETS } from "@/lib/data/assetPaths";
import { OfficialAssetImage } from "./OfficialAssetImage";

const STRIP = [
  { src: ASSETS.lifestyle.wellnessOffice, alt: "WELLNESS au bureau" },
  { src: ASSETS.lifestyle.wellnessFresh, alt: "WELLNESS en cuisine" },
  { src: ASSETS.lifestyle.bloom, alt: "BLOOM rituel maternité" },
  { src: ASSETS.lifestyle.period, alt: "PERIOD! confort cycle" },
  { src: ASSETS.lifestyle.pulse, alt: "PULSE sport" },
  { src: ASSETS.lifestyle.calm, alt: "CALM soirée" },
];

export function LifestyleMarquee() {
  const items = [...STRIP, ...STRIP];

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
              alt=""
              className="h-full w-full object-cover opacity-90"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
