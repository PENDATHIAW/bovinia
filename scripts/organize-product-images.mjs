#!/usr/bin/env node
/**
 * Classe automatiquement les images déposées dans public/assets/products/drop/
 * Aucun sous-dossier ni renommage requis — le script reconnaît les visuels officiels.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "public", "assets", "products");
const DROP = path.join(ROOT, "drop");
const SLUGS = ["wellness", "bloom", "period", "pulse", "calm"];
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

const UUID_CATALOG = {
  "2F591EDD-AAD1-4F19-BF28-A9111B4201D2": { slug: "wellness", role: "pot" },
  "70D3599F-6EA8-4B3D-9BAB-D731EDF1C8EB": { slug: "bloom", role: "pot" },
  "7356386B-FAB6-4AD5-95E7-BEE9D76A6BB2": { slug: "period", role: "pot" },
  "B77F36A7-4660-479D-9264-017220DAA82B": { slug: "pulse", role: "pot" },
  "F5D170C8-7583-469A-9DDB-DD96D4580F5F": { slug: "calm", role: "pot" },
  "FCE578D3-1050-4CE5-A04B-691516438CEF": { slug: "wellness", role: "lifestyle" },
  "5FC18661-AE54-4EE8-AAA4-35B765402892": { slug: "wellness", role: "lifestyle" },
  "1DC7FA8F-528A-4E0C-B305-BAEABF338AAF": { slug: "bloom", role: "lifestyle" },
  "953966F8-0291-4DAE-AB2C-660FC273DFA8": { slug: "period", role: "lifestyle" },
  "9D3BCCE0-2DDC-4EB1-A1A8-644331D6277D": { slug: "pulse", role: "lifestyle" },
  "881482F3-6A78-4651-91CE-E5EB07E0380E": { slug: "calm", role: "lifestyle" },
};

function classify(name) {
  const base = name.replace(/\.[^.]+$/, "").replace(/\s+\d+$/, "").trim().toUpperCase();
  if (UUID_CATALOG[base]) return UUID_CATALOG[base];

  const lower = name.toLowerCase();
  for (const slug of SLUGS) {
    if (lower.includes(slug)) {
      const isPot =
        lower.includes("-pot") ||
        lower.includes("_pot") ||
        lower.includes("packshot") ||
        lower === `${slug}.png` ||
        lower === `${slug}.jpg`;
      return { slug, role: isPot ? "pot" : "lifestyle" };
    }
  }
  return null;
}

function nextIndex(dir) {
  if (!fs.existsSync(dir)) return 1;
  return (
    Math.max(
      0,
      ...fs.readdirSync(dir).map((f) => parseInt(f.match(/^(\d+)/)?.[1] ?? "0", 10))
    ) + 1
  );
}

for (const dir of [DROP, path.join(ROOT, "inbox")]) {
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()));

  for (const file of files) {
    const info = classify(file);
    if (!info) {
      console.warn(`⚠ Non reconnu (laissez en place, le site essaiera quand même): ${file}`);
      continue;
    }

    const ext = path.extname(file);
    let dest;

    if (info.role === "pot") {
      dest = path.join(ROOT, "pots", `${info.slug}${ext}`);
    } else {
      const destDir = path.join(ROOT, "lifestyle", info.slug);
      fs.mkdirSync(destDir, { recursive: true });
      const idx = String(nextIndex(destDir)).padStart(2, "0");
      dest = path.join(destDir, `${idx}-visuel${ext}`);
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(path.join(dir, file), dest);
    console.log(`✓ ${file} → ${path.relative(ROOT, dest)}`);
  }
}

console.log("\nTerminé.");
