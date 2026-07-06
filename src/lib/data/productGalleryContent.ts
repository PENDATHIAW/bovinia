import type { ProductSlug } from "@/lib/data/assetPaths";

export interface GalleryImageMeta {
  caption: string;
  preparation?: "chaud" | "froid" | "les-deux";
}

/** Texte d'introduction de la section « En images » par rituel */
export const GALLERY_INTRO: Record<ProductSlug, string> = {
  wellness:
    "WELLNESS s'adapte à votre journée : chaud le matin dans une tasse (eau chaude ou tiède), ou frais en verre avec de l'eau glacée et une paille — une cuillère de poudre suffit.",
  bloom:
    "BLOOM accompagne la grossesse et le post-partum : une cuillère dans une tasse d'eau chaude ou de lait tiède — un rituel doux le matin ou l'après-midi.",
  period:
    "PERIOD! se prépare en infusion chaude : une dose dans une tasse, eau frémissante, quelques minutes de pause — un rituel cocooning pour le confort du cycle.",
  pulse:
    "PULSE est pensé pour le sport : une dose dans un shaker avec de l'eau fraîche, avant l'entraînement ou juste après pour retrouver énergie et vitalité.",
  calm:
    "CALM accompagne le soir : une cuillère dans une tasse d'eau chaude, comme une tisane apaisante — parfait avant le coucher pour favoriser sommeil et récupération.",
};

/** Légendes par motif de nom de fichier (dans lifestyle/{slug}/) */
const CAPTION_PATTERNS: Record<ProductSlug, { match: RegExp; meta: GalleryImageMeta }[]> = {
  wellness: [
    { match: /bureau|office|01-/, meta: { caption: "Au bureau — chaud, dans une tasse avec de l'eau chaude", preparation: "chaud" } },
    { match: /cuisine|fresh|froid|02-/, meta: { caption: "En cuisine — frais, eau glacée et paille", preparation: "froid" } },
  ],
  bloom: [
    { match: /grossesse|01-/, meta: { caption: "Grossesse — une tasse chaude, douceur au ventre", preparation: "chaud" } },
    { match: /maman|bebe|post-partum|02-/, meta: { caption: "Post-partum — rituel cocooning avec bébé, boisson chaude", preparation: "chaud" } },
  ],
  period: [
    { match: /rituel|01-/, meta: { caption: "Mon rituel — tasse chaude, eau frémissante", preparation: "chaud" } },
    { match: /journal|02-/, meta: { caption: "Pause bien-être — infusion chaude en douceur", preparation: "chaud" } },
  ],
  pulse: [
    { match: /post-workout|sport|01-/, meta: { caption: "Après l'effort — boisson fraîche dans un verre", preparation: "froid" } },
    { match: /shaker|02-/, meta: { caption: "Avant la séance — une dose dans le shaker, eau fraîche", preparation: "froid" } },
  ],
  calm: [
    { match: /soir|01-/, meta: { caption: "En fin de journée — tisane chaude, moment détente", preparation: "chaud" } },
    { match: /chambre|02-/, meta: { caption: "Avant le coucher — tasse fumante au chevet", preparation: "chaud" } },
  ],
};

const DEFAULT_CAPTION: GalleryImageMeta = { caption: "Rituel BOVINIA en situation réelle" };

export function getGalleryIntro(slug: string): string {
  return GALLERY_INTRO[slug as ProductSlug] ?? "Découvrez comment intégrer ce rituel à votre quotidien.";
}

export function getImageMeta(slug: string, src: string): GalleryImageMeta {
  const filename = src.split("/").pop() ?? "";
  const patterns = CAPTION_PATTERNS[slug as ProductSlug] ?? [];
  for (const { match, meta } of patterns) {
    if (match.test(filename)) return meta;
  }
  return DEFAULT_CAPTION;
}
