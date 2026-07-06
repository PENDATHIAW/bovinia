#!/usr/bin/env node
/**
 * Compresse les visuels BOVINIA en WebP léger (max 1200px, qualité 80).
 * Usage: node scripts/optimize-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "public", "assets", "products");
const IMAGE_EXT = /\.(png|jpe?g)$/i;

function walk(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (IMAGE_EXT.test(entry.name) && !entry.name.endsWith(".webp")) files.push(full);
  }
  return files;
}

const files = walk(ROOT);
let saved = 0;

for (const file of files) {
  const basename = path.basename(file);
  if (/\s+\d+\.[^.]+$/i.test(basename)) continue;
  if (/01-grossesse|02-preparation/.test(file)) continue;

  const before = fs.statSync(file).size;
  if (before < 1024) {
    console.log(`⊘ ${path.relative(ROOT, file)} (fichier vide, ignoré)`);
    continue;
  }

  const webpPath = file.replace(IMAGE_EXT, ".webp");

  await sharp(file)
    .rotate()
    .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webpPath);

  const after = fs.statSync(webpPath).size;
  saved += before - after;
  console.log(
    `✓ ${path.relative(ROOT, file)} → ${path.basename(webpPath)} (${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB)`
  );
}

console.log(`\nÉconomie totale : ${Math.round(saved / 1024 / 1024)} Mo`);
