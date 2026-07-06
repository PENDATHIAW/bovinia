import "server-only";
import fs from "fs";
import path from "path";
import {
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
  isPotPathRole,
  normalizeAssetBasename,
} from "@/lib/data/assetRegistry";
import { altFromFilename, listPublicImagesRecursive } from "@/lib/data/discoverAssets";

export const PRODUCT_SLUGS = ["wellness", "bloom", "period", "pulse", "calm"] as const;

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SCAN_ROOT = "assets/products";
const LIFESTYLE_ROOT = `${SCAN_ROOT}/lifestyle`;
const MAX_GALLERY = 4;

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

/** Galerie = uniquement le dossier lifestyle/{slug}/ (pas de mélange entre rituels) */
function scanLifestyleFolder(slug: ProductSlug): string[] {
  const folder = `${LIFESTYLE_ROOT}/${slug}`;
  const abs = path.join(PUBLIC_DIR, folder);
  if (!fs.existsSync(abs)) return [];

  return listPublicImagesRecursive(folder).filter((src) => {
    const rel = src.replace(/^\//, "");
    const { role } = classifyAssetPath(rel);
    if (role === "pot" || isPotAsset(src)) return false;
    return true;
  });
}

function scanPotAssets(): Partial<Record<ProductSlug, string>> {
  const pots: Partial<Record<ProductSlug, string>> = {};

  for (const src of dedupe(listPublicImagesRecursive(SCAN_ROOT))) {
    const rel = src.replace(/^\//, "");
    if (rel.includes("/brand/") || rel.includes("/drop/") || rel.includes("/inbox/")) continue;
    if (rel.includes(`/lifestyle/`)) continue;

    const { slug, role } = classifyAssetPath(rel);
    if (!slug) continue;

    const optimized = preferWebp(src);
    if (role === "pot" || isPotPathRole(rel)) {
      pots[slug] = optimized;
    }
  }

  for (const slug of PRODUCT_SLUGS) {
    if (!pots[slug]) {
      const potFolder = `${SCAN_ROOT}/pots/${slug}.webp`;
      const potFolderPng = `${SCAN_ROOT}/pots/${slug}.png`;
      if (fs.existsSync(path.join(PUBLIC_DIR, potFolder))) {
        pots[slug] = `/${potFolder}`;
      } else if (fs.existsSync(path.join(PUBLIC_DIR, potFolderPng))) {
        pots[slug] = preferWebp(`/${potFolderPng}`);
      } else {
        pots[slug] = preferWebp(getProductPotPath(slug)) || getProductPotFallback(slug);
      }
    }
  }

  return pots;
}

function buildAssetIndex() {
  const pots = scanPotAssets();
  const galleries = {} as Record<ProductSlug, string[]>;

  for (const slug of PRODUCT_SLUGS) {
    galleries[slug] = sortIllustrationPaths(dedupe(scanLifestyleFolder(slug))).slice(0, MAX_GALLERY);
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

export function resolveProductGallery(slug: string, _seedGallery: string[] = []): string[] {
  const folderGallery = getProductLifestyleUrls(slug);
  if (folderGallery.length > 0) return folderGallery;
  return [];
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
