import "server-only";
import path from "path";
import {
  ASSETS,
  getProductPotFallback,
  getProductPotPath,
  isBlockedAsset,
  isPotAsset,
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

/** Tri : préfixe numérique (01-, 02-) puis alphabétique */
export function sortIllustrationPaths(urls: string[]): string[] {
  return [...urls].sort((a, b) => {
    const numA = parseInt(path.basename(a).match(/^(\d+)/)?.[1] ?? "99", 10);
    const numB = parseInt(path.basename(b).match(/^(\d+)/)?.[1] ?? "99", 10);
    if (numA !== numB) return numA - numB;
    return a.localeCompare(b, "fr");
  });
}

function slugFromFilename(name: string): ProductSlug | null {
  const lower = name.toLowerCase();
  return PRODUCT_SLUGS.find((slug) => lower.includes(slug)) ?? null;
}

function isPotFilename(name: string): boolean {
  const base = path.basename(name.toLowerCase(), path.extname(name));
  return (
    base === "pot" ||
    name.toLowerCase().includes("-pot") ||
    name.toLowerCase().includes("_pot") ||
    name.toLowerCase().includes("packshot")
  );
}

function isBrandFile(relativePath: string): boolean {
  return relativePath.includes("/brand/");
}

function dedupe(urls: string[]): string[] {
  const seen = new Set<string>();
  return urls.filter((u) => {
    if (!u || seen.has(u) || isBlockedAsset(u) || isPotAsset(u)) return false;
    seen.add(u);
    return true;
  });
}

export function getAllProductsFolderImages(): string[] {
  return listPublicImagesRecursive(PRODUCTS_ROOT).filter(
    (src) => !isBrandFile(src) && !isBlockedAsset(src)
  );
}

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

/**
 * Illustrations lifestyle d'un rituel — plusieurs sources :
 * 1. products/lifestyle/{slug}/   ← principal (plusieurs fichiers OK)
 * 2. products/lifestyle/{slug}-*.png (ancien format plat)
 * 3. products/inbox/ (nom contient le slug)
 * 4. assets/auto/gallery/{slug}/
 */
export function getProductLifestyleUrls(slug: string): string[] {
  const prefix = slug.toLowerCase();

  const fromSlugFolder = listPublicImages(`${PRODUCTS_ROOT}/lifestyle/${slug}`);

  const fromFlatLifestyle = listPublicImages(`${PRODUCTS_ROOT}/lifestyle`).filter((src) => {
    const base = path.basename(src).toLowerCase();
    return base.startsWith(`${prefix}-`) || base.startsWith(`${prefix}.`);
  });

  const fromInbox = listPublicImages(`${PRODUCTS_ROOT}/inbox`).filter((src) => {
    const base = path.basename(src);
    return slugFromFilename(base) === slug && !isPotFilename(base);
  });

  const fromAuto = listPublicImages(`assets/auto/gallery/${slug}`);

  const fromScan = getAllProductsFolderImages().filter((src) => {
    if (src.includes("/pots/") || src.includes("/inbox/")) return false;
    const base = path.basename(src);
    if (slugFromFilename(base) !== slug) return false;
    return !isPotFilename(base);
  });

  const defaults = DEFAULT_LIFESTYLE[slug as ProductSlug] ?? [];

  return sortIllustrationPaths(
    dedupe([
      ...fromSlugFolder,
      ...fromFlatLifestyle,
      ...fromInbox,
      ...fromAuto,
      ...fromScan,
      ...defaults,
    ])
  );
}

export function resolveProductImage(slug: string): string {
  return getProductPotUrl(slug);
}

/** Galerie = illustrations uniquement (jamais le pot) */
export function resolveProductGallery(slug: string, seedGallery: string[] = []): string[] {
  const lifestyleOnly = seedGallery.filter((src) => !isPotAsset(src));
  return sortIllustrationPaths(
    dedupe([...lifestyleOnly, ...getProductLifestyleUrls(slug)])
  );
}

/** Bandeau accueil — une image par rituel, puis le reste */
export function getAllProductLifestyleMarquee(): { src: string; alt: string; slug?: string }[] {
  const items: { src: string; alt: string; slug?: string }[] = [];

  for (const slug of PRODUCT_SLUGS) {
    const images = getProductLifestyleUrls(slug);
    if (images[0]) {
      items.push({ src: images[0], alt: `${slug.toUpperCase()} — ${altFromFilename(images[0])}`, slug });
    }
  }

  const allLifestyle = listPublicImagesRecursive(`${PRODUCTS_ROOT}/lifestyle`).filter(
    (src) => !isPotAsset(src)
  );
  const inbox = listPublicImages(`${PRODUCTS_ROOT}/inbox`).filter((src) => !isPotAsset(src));

  for (const src of dedupe([...allLifestyle, ...inbox])) {
    if (items.some((i) => i.src === src)) continue;
    items.push({ src, alt: altFromFilename(src), slug: slugFromFilename(path.basename(src)) ?? undefined });
  }

  return items;
}

/** Première illustration pour cartes / aperçus */
export function getProductIllustrationPreview(slug: string): string | null {
  return getProductLifestyleUrls(slug)[0] ?? null;
}
