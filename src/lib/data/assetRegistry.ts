import type { ProductSlug } from "@/lib/data/assetPaths";

export type AssetRole = "pot" | "lifestyle" | "logo" | "hero" | "unknown";

export interface ClassifiedAsset {
  slug: ProductSlug | null;
  role: AssetRole;
}

/** Fichiers UUID officiels BOVINIA → rituel + rôle */
const UUID_CATALOG: Record<string, ClassifiedAsset> = {
  "1E8C3793-1C36-4FB3-8A32-3E510719EDAB": { slug: null, role: "logo" },
  "B730BCA1-B6E7-41A2-A6E7-AAB9330A4C07": { slug: null, role: "hero" },
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

const SLUGS: ProductSlug[] = ["wellness", "bloom", "period", "pulse", "calm"];

function uuidFromBasename(name: string): string | null {
  const base = name.replace(/\.[^.]+$/, "").toUpperCase();
  return UUID_CATALOG[base] ? base : null;
}

function slugFromPath(relativePath: string): ProductSlug | null {
  const lower = relativePath.toLowerCase();
  for (const slug of SLUGS) {
    if (lower.includes(`/${slug}/`) || lower.includes(`/${slug}.`)) return slug;
    if (lower.includes(`/${slug}-`) || lower.includes(`_${slug}_`)) return slug;
    if (lower.includes(`${slug}-`) && lower.includes("/lifestyle/")) return slug;
  }
  const base = lower.split("/").pop() ?? "";
  for (const slug of SLUGS) {
    if (base.startsWith(`${slug}.`) || base.startsWith(`${slug}-`) || base.includes(slug)) {
      return slug;
    }
  }
  return null;
}

function isPotPath(relativePath: string): boolean {
  const lower = relativePath.toLowerCase();
  return (
    lower.includes("/pots/") ||
    lower.includes("-pot.") ||
    lower.includes("_pot.") ||
    lower.includes("packshot")
  );
}

/** Classifie n'importe quel chemin d'image sous public/assets/ */
export function classifyAssetPath(relativePath: string): ClassifiedAsset {
  const normalized = relativePath.replace(/^\//, "");
  const basename = normalized.split("/").pop() ?? "";

  const uuid = uuidFromBasename(basename);
  if (uuid) return UUID_CATALOG[uuid];

  if (normalized.includes("/brand/logo")) return { slug: null, role: "logo" };
  if (normalized.includes("/brand/hero") || basename.includes("hero-gamme") || basename.includes("hero-range")) {
    return { slug: null, role: "hero" };
  }

  if (isPotPath(normalized)) {
    const slug = slugFromPath(normalized);
    return { slug, role: "pot" };
  }

  const slug = slugFromPath(normalized);
  if (slug) {
    if (basename === `${slug}.png` || basename === `${slug}.jpg`) {
      return { slug, role: "pot" };
    }
    return { slug, role: "lifestyle" };
  }

  return { slug: null, role: "unknown" };
}

export function isIllustrationPath(relativePath: string): boolean {
  const { role } = classifyAssetPath(relativePath);
  return role === "lifestyle";
}

export function isPotPathRole(relativePath: string): boolean {
  const { role } = classifyAssetPath(relativePath);
  return role === "pot";
}
