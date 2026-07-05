import "server-only";
import fs from "fs";
import path from "path";
import { isBlockedAsset } from "@/lib/data/assetPaths";
import { listPublicImages } from "@/lib/data/discoverAssets";

export const PRODUCT_SLUGS = ["wellness", "bloom", "period", "pulse", "calm"] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

const PUBLIC_DIR = path.join(process.cwd(), "public");
const PRODUCTS_ROOT = "assets/products";
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);

function toUrl(relativePath: string): string {
  return `/${PRODUCTS_ROOT}/${relativePath}`.replace(/\\/g, "/");
}

function findImageFile(dirRelative: string, baseName: string): string | null {
  const abs = path.join(PUBLIC_DIR, dirRelative);
  if (!fs.existsSync(abs)) return null;

  for (const entry of fs.readdirSync(abs)) {
    const ext = path.extname(entry).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    if (path.basename(entry, ext).toLowerCase() === baseName.toLowerCase()) {
      return entry;
    }
  }
  return null;
}

function slugFromFilename(name: string): ProductSlug | null {
  const lower = name.toLowerCase();
  return PRODUCT_SLUGS.find((slug) => lower.includes(slug)) ?? null;
}

function isPotFilename(name: string): boolean {
  const lower = name.toLowerCase();
  return (
    lower.includes("-pot") ||
    lower.includes("_pot") ||
    lower.endsWith("pot") ||
    lower.includes("packshot") ||
    lower.includes("pot-")
  );
}

/** Pot officiel — assets/products/pots/{slug}.png */
export function getProductPotUrl(slug: string): string | null {
  const file = findImageFile(`${PRODUCTS_ROOT}/pots`, slug);
  return file ? toUrl(`pots/${file}`) : null;
}

/** Lifestyle d'un rituel — assets/products/lifestyle/{slug}-*.png */
export function getProductLifestyleUrls(slug: string): string[] {
  const prefix = slug.toLowerCase();
  return listPublicImages(`${PRODUCTS_ROOT}/lifestyle`).filter((src) => {
    const base = path.basename(src).toLowerCase();
    return base.startsWith(`${prefix}-`) || base.startsWith(`${prefix}.`) || base === `${prefix}.png`;
  });
}

/** Fichiers déposés dans products/inbox/ — classés par nom de fichier */
export function getInboxImagesForSlug(slug: string): string[] {
  const results: string[] = [];

  for (const src of listPublicImages(`${PRODUCTS_ROOT}/inbox`)) {
    const base = path.basename(src);
    const detected = slugFromFilename(base);
    if (detected !== slug) continue;
    if (isPotFilename(base)) continue;
    results.push(src);
  }

  return results;
}

/** Pots déposés dans inbox (ex. wellness-pot.jpg) */
export function getInboxPotUrl(slug: string): string | null {
  for (const src of listPublicImages(`${PRODUCTS_ROOT}/inbox`)) {
    const base = path.basename(src);
    if (slugFromFilename(base) !== slug) continue;
    if (isPotFilename(base) || base.toLowerCase() === `${slug}.png`) return src;
  }
  return null;
}

/** Image principale d'un produit (pot) */
export function resolveProductImage(slug: string, fallback: string): string {
  return getInboxPotUrl(slug) ?? getProductPotUrl(slug) ?? fallback;
}

/** Galerie complète d'un rituel */
export function resolveProductGallery(slug: string, fallback: string[]): string[] {
  const merged: string[] = [];
  const seen = new Set<string>();

  const sources = [
    ...fallback,
    ...getProductLifestyleUrls(slug),
    ...getInboxImagesForSlug(slug),
    ...listPublicImages(`assets/auto/gallery/${slug}`),
  ];

  for (const src of sources) {
    if (seen.has(src) || isBlockedAsset(src)) continue;
    seen.add(src);
    merged.push(src);
  }

  return merged;
}

/** Toutes les images lifestyle pour le bandeau défilant */
export function getAllProductLifestyleMarquee(): { src: string; alt: string }[] {
  return listPublicImages(`${PRODUCTS_ROOT}/lifestyle`).map((src) => ({
    src,
    alt: path.basename(src, path.extname(src)).replace(/[-_]+/g, " "),
  }));
}
