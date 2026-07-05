import type { Product } from "@/types/database";
import { isBlockedAsset } from "@/lib/data/assetPaths";
import { OfficialAssetImage } from "./OfficialAssetImage";
import { SectionHeader } from "./SectionHeader";

interface ProductLifestyleSectionProps {
  product: Product;
}

export function ProductLifestyleSection({ product }: ProductLifestyleSectionProps) {
  const images = (product.gallery.length > 0 ? product.gallery : product.image ? [product.image] : [])
    .filter((src) => !isBlockedAsset(src));
  if (images.length === 0) return null;

  const [featured, ...rest] = images;

  return (
    <section className="mt-16">
      <SectionHeader
        label="Rituel en image"
        title={`${product.name} au quotidien`}
        description="Visuels officiels BOVINIA — votre rituel, en situation réelle."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="gold-frame lg:col-span-7">
          <div className="gold-frame-inner">
            <OfficialAssetImage
              src={featured}
              alt={`${product.name} BOVINIA — rituel principal`}
              className="mx-auto h-auto w-full object-contain"
            />
          </div>
        </div>
        {rest.length > 0 && (
          <div className="flex flex-col gap-4 lg:col-span-5">
            {rest.map((src, index) => (
              <div
                key={`${product.slug}-${index}`}
                className="card-premium flex-1 overflow-hidden p-0"
              >
                <OfficialAssetImage
                  src={src}
                  alt={`${product.name} BOVINIA - rituel ${index + 2}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
