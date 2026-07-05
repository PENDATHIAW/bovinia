#!/usr/bin/env node
/**
 * Copie les fichiers déposés dans public/assets/incoming/ vers les chemins officiels.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const incoming = path.join(root, "public/assets/incoming");
const assets = path.join(root, "public/assets");

const MAP = {
  "bovinia-logo.png": "logo/bovinia-logo.png",
  "bovinia-logo-icon.png": "logo/bovinia-logo-icon.png",
  "hero-range.jpg": "brand/hero-range.jpg",
  "wellness.png": "products/wellness.png",
  "bloom.png": "products/bloom.png",
  "period.png": "products/period.png",
  "pulse.png": "products/pulse.png",
  "calm.png": "products/calm.png",
  "wellness-office.jpg": "lifestyle/wellness-office.jpg",
  "wellness-fresh.jpg": "lifestyle/wellness-fresh.jpg",
  "bloom.jpg": "lifestyle/bloom.jpg",
  "period.jpg": "lifestyle/period.jpg",
  "pulse.jpg": "lifestyle/pulse.jpg",
  "calm.jpg": "lifestyle/calm.jpg",
};

const BLOCKED = ["formulas-chart", "formule"];

if (!fs.existsSync(incoming)) process.exit(0);

let copied = 0;
for (const name of fs.readdirSync(incoming)) {
  if (name.startsWith(".") || name.endsWith(".md")) continue;
  if (BLOCKED.some((b) => name.toLowerCase().includes(b))) {
    console.warn(`[assets] Fichier bloqué (formules): ${name}`);
    continue;
  }
  const destRel = MAP[name];
  if (!destRel) {
    console.warn(`[assets] Fichier ignoré (nom inconnu): ${name}`);
    continue;
  }
  const src = path.join(incoming, name);
  if (!fs.statSync(src).isFile()) continue;
  const dest = path.join(assets, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`[assets] ${name} → ${destRel}`);
  copied++;
}

if (copied > 0) {
  console.log(`[assets] ${copied} visuel(s) officiel(s) synchronisé(s).`);
}
