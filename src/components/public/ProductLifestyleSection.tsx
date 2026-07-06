import type { Product } from "@/types/database";
import { getGalleryIntro, getImageMeta } from "@/lib/data/productGalleryContent";
import { isBlockedAsset } from "@/lib/data/assetPaths";
import { OfficialAssetImage } from "./OfficialAssetImage";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

interface ProductLifestyleSectionProps {
  product: Product;
}

function layoutClass(index: number, total: number): string {
  if (total === 1) return "col-span-full";
  if (total === 2) return "col-span-1 min-h-[220px] sm:min-h-[280px]";
  if (total === 3) {
    if (index === 0) return "col-span-full sm:col-span-2 sm:row-span-2 min-h-[280px] sm:min-h-[360px]";
    return "col-span-1 min-h-[180px] sm:min-h-[170px]";
  }
  if (total === 4) {
    if (index === 0) return "col-span-full sm:col-span-2 sm:row-span-2 min-h-[300px]";
    return "col-span-1 min-h-[160px] sm:min-h-[140px]";
  }
  if (index === 0) return "col-span-full min-h-[320px] md:min-h-[400px]";
  return "col-span-1 min-h-[200px] sm:min-h-[220px]";
}

const PREP_BADGE: Record<string, string> = {
  chaud: "Chaud",
  froid: "Froid",
  "les-deux": "Chaud ou froid",
};

export function ProductLifestyleSection({ product }: ProductLifestyleSectionProps) {
  const images = product.gallery.filter((src) => !isBlockedAsset(src));
  if (images.length === 0) return null;

  const gridCols =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : images.length === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : images.length === 4
            ? "grid-cols-2 sm:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <section id="images" className="mt-16 scroll-mt-36">
      <SectionHeader
        label="Comment le préparer"
        title={`${product.name} au quotidien`}
        description={getGalleryIntro(product.slug)}
      />

      <div className={cn("grid auto-rows-fr gap-4", gridCols)}>
        {images.map((src, index) => {
          const meta = getImageMeta(product.slug, src);
          const isHero = index === 0 && images.length >= 3;

          return (
            <div
              key={`${product.slug}-${src}`}
              className={cn(
                "group overflow-hidden rounded-2xl border border-gold/20 bg-cream/30 shadow-sm transition-shadow hover:shadow-lg",
                layoutClass(index, images.length),
                isHero && "gold-frame p-1"
              )}
            >
              <div
                className={cn(
                  "relative h-full w-full overflow-hidden",
                  isHero ? "gold-frame-inner h-full" : "rounded-2xl"
                )}
              >
                <OfficialAssetImage
                  src={src}
                  alt={`${product.name} BOVINIA — ${meta.caption}`}
                  className={cn(
                    "h-full w-full transition-transform duration-500 group-hover:scale-[1.02]",
                    isHero ? "object-contain" : "object-cover"
                  )}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/80 via-forest/40 to-transparent px-4 pb-3 pt-10">
                  {meta.preparation && (
                    <span className="mb-1 inline-block rounded-full bg-ivory/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ivory">
                      {PREP_BADGE[meta.preparation]}
                    </span>
                  )}
                  <p className="text-xs font-medium leading-snug text-ivory">{meta.caption}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
