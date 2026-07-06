import "server-only";
import fs from "fs";
import path from "path";
import { isBlockedAsset } from "@/lib/data/assetPaths";

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Liste les images d'un dossier dans public/ → URLs du type /assets/... */
export function listPublicImages(relativeDir: string): string[] {
  const abs = path.join(PUBLIC_DIR, relativeDir);
  if (!fs.existsSync(abs)) return [];

  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        IMAGE_EXT.has(path.extname(entry.name).toLowerCase()) &&
        !entry.name.startsWith(".")
    )
    .map((entry) => entry.name)
    .filter((name) => !isBlockedAsset(name))
    .sort((a, b) => a.localeCompare(b, "fr"))
    .map((name) => `/${relativeDir}/${name}`.replace(/\\/g, "/"));
}

/** Parcourt récursivement un dossier et retourne toutes les images */
export function listPublicImagesRecursive(relativeDir: string): string[] {
  const abs = path.join(PUBLIC_DIR, relativeDir);
  if (!fs.existsSync(abs)) return [];

  const results: string[] = [];

  function walk(currentAbs: string, currentRel: string) {
    for (const entry of fs.readdirSync(currentAbs, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const entryAbs = path.join(currentAbs, entry.name);
      const entryRel = `${currentRel}/${entry.name}`.replace(/\\/g, "/");

      if (entry.isDirectory()) {
        walk(entryAbs, entryRel);
        continue;
      }

      const ext = path.extname(entry.name).toLowerCase();
      if (!IMAGE_EXT.has(ext) || isBlockedAsset(entry.name)) continue;
      results.push(`/${entryRel}`);
    }
  }

  walk(abs, relativeDir.replace(/\\/g, "/"));
  return results.sort((a, b) => a.localeCompare(b, "fr"));
}

function altFromFilename(src: string): string {
  const base = path.basename(src, path.extname(src));
  return base.replace(/[-_]+/g, " ").trim() || "BOVINIA";
}

const AUTO_ROOT = "assets/auto";

/** Images du bandeau défilant — auto/marquee/ */
export function getAutoMarqueeImages(): { src: string; alt: string }[] {
  return listPublicImages(`${AUTO_ROOT}/marquee`).map((src) => ({
    src,
    alt: altFromFilename(src),
  }));
}

/** Images auto/gallery/{slug}/ */
export function getAutoGalleryForSlug(slug: string): string[] {
  return listPublicImages(`${AUTO_ROOT}/gallery/${slug}`);
}

/** Fusionne galerie existante + images auto (sans doublons) */
export function mergeProductGallery(base: string[], slug: string): string[] {
  const merged: string[] = [];
  const seen = new Set<string>();

  for (const src of [...base, ...getAutoGalleryForSlug(slug)]) {
    if (seen.has(src) || isBlockedAsset(src)) continue;
    seen.add(src);
    merged.push(src);
  }

  return merged;
}

export { altFromFilename };
