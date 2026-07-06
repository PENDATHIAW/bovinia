import "server-only";
import fs from "fs";
import path from "path";
import {
  ASSETS,
  getProductPotFallback,
  getProductPotPath,
  isBlockedAsset,
  isPotAsset,
  pngFallbackForWebp,
  type ProductSlug,
} from "@/lib/data/assetPaths";
import {
  classifyAssetPath,
  isDuplicateVariant,
  isIllustrationPath,
  isPotPathRole,
  normalizeAssetBasename,
} from "@/lib/data/assetRegistry";
import { altFromFilename, listPublicImagesRecursive } from "@/lib/data/discoverAssets";

export const PRODUCT_SLUGS = ["wellness", "bloom", "period", "pulse", "calm"] as const;

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SCAN_ROOT = "assets/products";
const MAX_GALLERY = 4;

const DEFAULT_LIFESTYLE: Record<ProductSlug, string[]> = {
  wellness: [ASSETS.lifestyle.wellnessOffice, ASSETS.lifestyle.wellnessFresh],
  bloom: [ASSETS.lifestyle.bloom],
  period: [ASSETS.lifestyle.period],
  pulse: [ASSETS.lifestyle.pulse],
  calm: [ASSETS.lifestyle.calm],
};

/** Préfère WebP si disponible */
export function preferWebp(src: string): string {
  if (!src.startsWith("/")) return src;
  const webp = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const rel = webp.slice(1);
  if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return webp;
  return src;
}

function fileSize(src: string): number {
  try {
    const rel = src.replace(/^\//, "");
    return fs.statSync(path.join(PUBLIC_DIR, rel)).size;
  } catch {
    return 999_999_999;
  }
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

export function sortIllustrationPaths(urls: string[]): string[] {
  return [...urls]
    .map(preferWebp)
    .sort((a, b) => {
      const sizeDiff = fileSize(a) - fileSize(b);
      if (Math.abs(sizeDiff) > 50_000) return sizeDiff;
      const numA = parseInt(path.basename(a).match(/^(\d+)/)?.[1] ?? "99", 10);
      const numB = parseInt(path.basename(b).match(/^(\d+)/)?.[1] ?? "99", 10);
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b, "fr");
    });
}

function scanProductAssets(): string[] {
  return listPublicImagesRecursive(SCAN_ROOT).filter((src) => {
    const rel = src.replace(/^\//, "");
    if (rel.includes("/brand/")) return false;
    if (rel.endsWith(".json") || rel.endsWith(".md")) return false;
    if (rel.includes("/drop/") || rel.includes("/inbox/")) return false;
    return true;
  });
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

  for (const src of dedupe(scanProductAssets())) {
    const rel = src.replace(/^\//, "");
    const { slug, role } = classifyAssetPath(rel);
    if (!slug) continue;

    const optimized = preferWebp(src);

    if (role === "pot" || isPotPathRole(rel)) {
      pots[slug] = optimized;
      continue;
    }

    if ((role === "lifestyle" || isIllustrationPath(rel)) && !isPotAsset(src)) {
      galleries[slug].push(optimized);
    }
  }

  for (const slug of PRODUCT_SLUGS) {
    galleries[slug] = sortIllustrationPaths(
      dedupe([...galleries[slug], ...DEFAULT_LIFESTYLE[slug]])
    ).slice(0, MAX_GALLERY);

    if (!pots[slug]) {
      pots[slug] = preferWebp(getProductPotPath(slug)) || getProductPotFallback(slug);
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
  return pots[slug as ProductSlug] ?? preferWebp(getProductPotPath(slug)) ?? getProductPotFallback(slug);
}

export function getProductLifestyleUrls(slug: string): string[] {
  return getIndex().galleries[slug as ProductSlug] ?? [];
}

export function resolveProductImage(slug: string): string {
  return getProductPotUrl(slug);
}

export function resolveProductGallery(slug: string, seedGallery: string[] = []): string[] {
  const lifestyleOnly = seedGallery.filter((src) => !isPotAsset(src)).map(preferWebp);
  return sortIllustrationPaths(dedupe([...lifestyleOnly, ...getProductLifestyleUrls(slug)])).slice(
    0,
    MAX_GALLERY
  );
}

export function getProductIllustrationPreview(slug: string): string | null {
  return getProductLifestyleUrls(slug)[0] ?? null;
}

export function getPotPngFallback(slug: string): string | undefined {
  const webp = getProductPotUrl(slug);
  return pngFallbackForWebp(webp) ?? getProductPotFallback(slug);
}

export function refreshAssetIndex() {
  cache = null;
}
