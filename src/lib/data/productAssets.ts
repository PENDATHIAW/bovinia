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
  classifyAssetPath,
  isDuplicateVariant,
  isIllustrationPath,
  isPotPathRole,
  normalizeAssetBasename,
} from "@/lib/data/assetRegistry";
import {
  altFromFilename,
  listPublicImagesRecursive,
} from "@/lib/data/discoverAssets";

export const PRODUCT_SLUGS = ["wellness", "bloom", "period", "pulse", "calm"] as const;

const SCAN_ROOTS = [
  "assets/products",
  "assets/lifestyle",
  "assets/auto/gallery",
  "assets",
] as const;

const DEFAULT_LIFESTYLE: Record<ProductSlug, string[]> = {
  wellness: [ASSETS.lifestyle.wellnessOffice, ASSETS.lifestyle.wellnessFresh],
  bloom: [ASSETS.lifestyle.bloom],
  period: [ASSETS.lifestyle.period],
  pulse: [ASSETS.lifestyle.pulse],
  calm: [ASSETS.lifestyle.calm],
};

/** Score de priorité — products/ > lifestyle/ > logo UUID */
function pathPriority(src: string): number {
  if (src.includes("/products/lifestyle/")) return 0;
  if (src.includes("/products/pots/")) return 1;
  if (src.includes("/products/inbox/")) return 2;
  if (src.includes("/products/")) return 3;
  if (src.includes("/assets/lifestyle/")) return 4;
  if (src.includes("/assets/logo/")) return 6;
  if (src.includes("/assets/")) return 5;
  return 10;
}

export function sortIllustrationPaths(urls: string[]): string[] {
  return [...urls].sort((a, b) => {
    const prio = pathPriority(a) - pathPriority(b);
    if (prio !== 0) return prio;
    const numA = parseInt(path.basename(a).match(/^(\d+)/)?.[1] ?? "99", 10);
    const numB = parseInt(path.basename(b).match(/^(\d+)/)?.[1] ?? "99", 10);
    if (numA !== numB) return numA - numB;
    return a.localeCompare(b, "fr");
  });
}

function dedupe(urls: string[]): string[] {
  const seen = new Set<string>();
  const seenBase = new Set<string>();

  return urls.filter((u) => {
    if (!u || isBlockedAsset(u)) return false;

    const basename = u.split("/").pop() ?? "";
    if (isDuplicateVariant(basename)) return false;

    const baseKey = normalizeAssetBasename(basename);
    if (seenBase.has(baseKey)) return false;

    if (seen.has(u)) return false;
    seen.add(u);
    seenBase.add(baseKey);
    return true;
  });
}

/** Scan automatique de tous les visuels BOVINIA */
function scanAllAssetUrls(): string[] {
  const all: string[] = [];
  for (const root of SCAN_ROOTS) {
    all.push(...listPublicImagesRecursive(root));
  }
  return dedupe(
    all.filter((src) => {
      const rel = src.replace(/^\//, "");
      if (rel.includes("/logo/") && !rel.includes("bovinia-logo")) {
        const { role } = classifyAssetPath(rel);
        return role === "pot" || role === "lifestyle";
      }
      if (rel.includes("/brand/")) return false;
      if (rel.includes("/incoming/")) return false;
      if (rel.endsWith("asset-manifest.json")) return false;
      if (rel.endsWith("README.md")) return false;
      return true;
    })
  );
}

function buildAssetIndex() {
  const pots: Partial<Record<ProductSlug, string>> = {};
  const galleries: Record<ProductSlug, string[]> = {
    wellness: [],
    bloom: [],
    period: [],
    pulse: [],
    calm: [],
  };

  for (const src of scanAllAssetUrls()) {
    const rel = src.replace(/^\//, "");
    const { slug, role } = classifyAssetPath(rel);
    if (!slug) continue;

    if (role === "pot" || isPotPathRole(rel)) {
      if (!pots[slug] || pathPriority(src) < pathPriority(pots[slug]!)) {
        pots[slug] = src;
      }
      continue;
    }

    if (role === "lifestyle" || isIllustrationPath(rel)) {
      if (!isPotAsset(src)) galleries[slug].push(src);
    }
  }

  for (const slug of PRODUCT_SLUGS) {
    galleries[slug] = sortIllustrationPaths(
      dedupe([...galleries[slug], ...DEFAULT_LIFESTYLE[slug]])
    );
    if (!pots[slug]) {
      const canonical = getProductPotPath(slug);
      if (canonical) pots[slug] = canonical;
      else pots[slug] = getProductPotFallback(slug);
    }
  }

  return { pots, galleries };
}

let cache: ReturnType<typeof buildAssetIndex> | null = null;

function getIndex() {
  if (!cache) cache = buildAssetIndex();
  return cache;
}

export function getProductPotUrl(slug: string): string {
  const { pots } = getIndex();
  return pots[slug as ProductSlug] ?? getProductPotPath(slug) ?? getProductPotFallback(slug);
}

export function getProductLifestyleUrls(slug: string): string[] {
  const { galleries } = getIndex();
  return galleries[slug as ProductSlug] ?? [];
}

export function resolveProductImage(slug: string): string {
  return getProductPotUrl(slug);
}

export function resolveProductGallery(slug: string, seedGallery: string[] = []): string[] {
  const lifestyleOnly = seedGallery.filter((src) => !isPotAsset(src));
  return sortIllustrationPaths(
    dedupe([...lifestyleOnly, ...getProductLifestyleUrls(slug)])
  );
}

export function getAllProductLifestyleMarquee(): { src: string; alt: string; slug?: string }[] {
  const items: { src: string; alt: string; slug?: string }[] = [];
  const seen = new Set<string>();

  for (const slug of PRODUCT_SLUGS) {
    for (const src of getProductLifestyleUrls(slug)) {
      if (seen.has(src)) continue;
      seen.add(src);
      items.push({ src, alt: `${slug.toUpperCase()} — ${altFromFilename(src)}`, slug });
    }
  }

  return items;
}

export function getProductIllustrationPreview(slug: string): string | null {
  return getProductLifestyleUrls(slug)[0] ?? null;
}

/** Invalide le cache (dev hot reload) */
export function refreshAssetIndex() {
  cache = null;
}
