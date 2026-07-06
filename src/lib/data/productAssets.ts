import "server-only";
import path from "path";
import {
  ASSETS,
  getProductPotFallback,
  getProductPotPath,
  isBlockedAsset,
  type ProductSlug,
} from "@/lib/data/assetPaths";
import {
  altFromFilename,
  listPublicImages,
  listPublicImagesRecursive,
} from "@/lib/data/discoverAssets";

export const PRODUCT_SLUGS = ["wellness", "bloom", "period", "pulse", "calm"] as const;

const PRODUCTS_ROOT = "assets/products";

const DEFAULT_LIFESTYLE: Record<ProductSlug, string[]> = {
  wellness: [ASSETS.lifestyle.wellnessOffice, ASSETS.lifestyle.wellnessFresh],
  bloom: [ASSETS.lifestyle.bloom],
  period: [ASSETS.lifestyle.period],
  pulse: [ASSETS.lifestyle.pulse],
  calm: [ASSETS.lifestyle.calm],
};

function slugFromFilename(name: string): ProductSlug | null {
  const lower = name.toLowerCase();
  return PRODUCT_SLUGS.find((slug) => lower.includes(slug)) ?? null;
}

function isPotFilename(name: string): boolean {
  const lower = name.toLowerCase();
  const base = path.basename(lower, path.extname(lower));
  return (
    base === "pot" ||
    lower.includes("-pot") ||
    lower.includes("_pot") ||
    lower.endsWith("pot") ||
    lower.includes("packshot")
  );
}

function isBrandFile(relativePath: string): boolean {
  return relativePath.includes("/brand/");
}

function dedupe(urls: string[]): string[] {
  const seen = new Set<string>();
  return urls.filter((u) => {
    if (!u || seen.has(u) || isBlockedAsset(u)) return false;
    seen.add(u);
    return true;
  });
}

/** Toutes les images sous products/ (sauf brand) */
export function getAllProductsFolderImages(): string[] {
  return listPublicImagesRecursive(PRODUCTS_ROOT).filter(
    (src) => !isBrandFile(src) && !isBlockedAsset(src)
  );
}

/** Pot principal — jamais vide */
export function getProductPotUrl(slug: string): string {
  const canonical = getProductPotPath(slug);
  if (canonical) return canonical;

  for (const src of getAllProductsFolderImages()) {
    const base = path.basename(src);
    if (slugFromFilename(base) !== slug) continue;
    if (isPotFilename(base) || base.toLowerCase() === `${slug}.png`) return src;
  }

  return getProductPotFallback(slug);
}

/** Lifestyle d'un rituel — dossier lifestyle/ + scan + défauts */
export function getProductLifestyleUrls(slug: string): string[] {
  const prefix = slug.toLowerCase();

  const fromLifestyleDir = listPublicImages(`${PRODUCTS_ROOT}/lifestyle`).filter((src) => {
    const base = path.basename(src).toLowerCase();
    return base.startsWith(`${prefix}-`) || base.startsWith(`${prefix}.`);
  });

  const fromScan = getAllProductsFolderImages().filter((src) => {
    if (src.includes("/pots/")) return false;
    const base = path.basename(src);
    if (slugFromFilename(base) !== slug) return false;
    return !isPotFilename(base);
  });

  const defaults = DEFAULT_LIFESTYLE[slug as ProductSlug] ?? [];

  return dedupe([...fromLifestyleDir, ...fromScan, ...defaults]);
}

export function resolveProductImage(slug: string): string {
  return getProductPotUrl(slug);
}

export function resolveProductGallery(slug: string, seedGallery: string[] = []): string[] {
  return dedupe([
    ...seedGallery,
    ...getProductLifestyleUrls(slug),
    ...listPublicImages(`assets/auto/gallery/${slug}`),
  ]);
}

export function getAllProductLifestyleMarquee(): { src: string; alt: string }[] {
  const lifestyle = listPublicImages(`${PRODUCTS_ROOT}/lifestyle`);
  const scanned = getAllProductsFolderImages().filter((src) => !src.includes("/pots/"));

  return dedupe([...lifestyle, ...scanned]).map((src) => ({
    src,
    alt: altFromFilename(src),
  }));
}
