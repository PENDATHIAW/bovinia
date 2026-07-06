#!/usr/bin/env node
/**
 * Classe les images déposées dans public/assets/products/inbox/
 * vers le bon dossier rituel.
 *
 * Usage: node scripts/organize-product-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "public", "assets", "products");
const INBOX = path.join(ROOT, "inbox");
const SLUGS = ["wellness", "bloom", "period", "pulse", "calm"];
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

function slugFromName(name) {
  const lower = name.toLowerCase();
  return SLUGS.find((s) => lower.includes(s)) ?? null;
}

function isPot(name) {
  const lower = name.toLowerCase();
  return lower.includes("-pot") || lower.includes("_pot") || lower.includes("packshot");
}

function nextIndex(dir) {
  if (!fs.existsSync(dir)) return 1;
  const nums = fs
    .readdirSync(dir)
    .map((f) => parseInt(f.match(/^(\d+)/)?.[1] ?? "0", 10))
    .filter((n) => n > 0);
  return nums.length ? Math.max(...nums) + 1 : 1;
}

if (!fs.existsSync(INBOX)) {
  console.log("Dossier inbox introuvable.");
  process.exit(0);
}

const files = fs.readdirSync(INBOX).filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()));

if (!files.length) {
  console.log("Aucune image dans inbox/.");
  process.exit(0);
}

for (const file of files) {
  const slug = slugFromName(file);
  if (!slug) {
    console.warn(`⚠ Ignoré (slug inconnu): ${file}`);
    continue;
  }

  const ext = path.extname(file);
  let destDir;
  let destName;

  if (isPot(file)) {
    destDir = path.join(ROOT, "pots");
    destName = `${slug}${ext}`;
  } else {
    destDir = path.join(ROOT, "lifestyle", slug);
    fs.mkdirSync(destDir, { recursive: true });
    const idx = String(nextIndex(destDir)).padStart(2, "0");
    const label = file
      .replace(/\.[^.]+$/, "")
      .replace(new RegExp(slug, "i"), "")
      .replace(/^[-_]+|[-_]+$/g, "")
      .slice(0, 40) || "visuel";
    destName = `${idx}-${label}${ext}`;
  }

  fs.mkdirSync(destDir, { recursive: true });
  const dest = path.join(destDir, destName);
  fs.renameSync(path.join(INBOX, file), dest);
  console.log(`✓ ${file} → ${path.relative(ROOT, dest)}`);
}

console.log("\nTerminé. Commit + push pour mettre en ligne.");
