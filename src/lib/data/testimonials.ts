import type { Testimonial } from "@/types/database";

/**
 * Témoignages illustratifs — formulés selon les problématiques ciblées par chaque rituel.
 * À remplacer par de vrais retours clients via l'admin.
 */
export const SEED_TESTIMONIALS: Testimonial[] = [
  // WELLNESS — digestion, énergie matinale, bien-être quotidien, complément naturel
  {
    id: "w1",
    name: "Aminata D.",
    city: "Dakar",
    rating: 5,
    text: "Je me levais fatiguée malgré 8 h de sommeil. Depuis WELLNESS le matin, j'ai plus d'élan pour démarrer la journée — sans café en excès.",
    product_id: "wellness",
    product_name: "WELLNESS",
    is_visible: true,
    created_at: "2026-01-15T00:00:00.000Z",
  },
  {
    id: "w2",
    name: "Ibrahima T.",
    city: "Dakar",
    rating: 5,
    text: "J'avais souvent l'estomac lourd après le déjeuner. Le rituel matin à l'eau chaude m'aide à mieux digérer au quotidien.",
    product_id: "wellness",
    product_name: "WELLNESS",
    is_visible: true,
    created_at: "2026-02-01T00:00:00.000Z",
  },
  {
    id: "w3",
    name: "Coumba F.",
    city: "Rufisque",
    rating: 5,
    text: "Je cherchais une alternative locale aux compléments importés trop chers. WELLNESS couvre mon besoin de routine bien-être naturelle.",
    product_id: "wellness",
    product_name: "WELLNESS",
    is_visible: true,
    created_at: "2026-02-20T00:00:00.000Z",
  },
  // BLOOM — grossesse, post-partum, nutrition douce, nausées
  {
    id: "b1",
    name: "Fatou S.",
    city: "Thiès",
    rating: 5,
    text: "Enceinte de 6 mois, les nausées du matin me gênaient. BLOOM au lait chaud passe bien et ne m'agresse pas l'estomac.",
    product_id: "bloom",
    product_name: "BLOOM",
    is_visible: true,
    created_at: "2026-01-20T00:00:00.000Z",
  },
  {
    id: "b2",
    name: "Aïssatou M.",
    city: "Dakar",
    rating: 5,
    text: "Post-partum, j'étais épuisée et je cherchais du réconfort nutritionnel. Le goût mangue-coco de BLOOM m'a aidée à tenir mes journées.",
    product_id: "bloom",
    product_name: "BLOOM",
    is_visible: true,
    created_at: "2026-02-10T00:00:00.000Z",
  },
  {
    id: "b3",
    name: "Ndeye P.",
    city: "Saint-Louis",
    rating: 5,
    text: "En allaitement, je voulais éviter les poudres chimiques. BLOOM est devenu ma collation douce de l'après-midi.",
    product_id: "bloom",
    product_name: "BLOOM",
    is_visible: true,
    created_at: "2026-03-01T00:00:00.000Z",
  },
  // PERIOD! — confort cycle, règles, ballonnements, fatigue prémenstruelle
  {
    id: "p1",
    name: "Marième N.",
    city: "Dakar",
    rating: 5,
    text: "Avant mes règles, je suis souvent ballonnée. La tisane chaude PERIOD! le soir m'apporte un vrai confort ces jours-là.",
    product_id: "period",
    product_name: "PERIOD!",
    is_visible: true,
    created_at: "2026-01-25T00:00:00.000Z",
  },
  {
    id: "p2",
    name: "Rokhaya D.",
    city: "Mbour",
    rating: 5,
    text: "Pendant le cycle, je manque d'énergie. PERIOD! le matin en boisson tiède m'aide à traverser la semaine plus sereinement.",
    product_id: "period",
    product_name: "PERIOD!",
    is_visible: true,
    created_at: "2026-02-15T00:00:00.000Z",
  },
  {
    id: "p3",
    name: "Sophie L.",
    city: "Dakar",
    rating: 5,
    text: "Je voulais un rituel naturel pour mes règles, sans promesses miracles. Le bissap-cannelle chaud est devenu mon réflexe prémenstruel.",
    product_id: "period",
    product_name: "PERIOD!",
    is_visible: true,
    created_at: "2026-03-05T00:00:00.000Z",
  },
  // PULSE — sport, récupération, énergie avant effort, vitalité
  {
    id: "pu1",
    name: "Moussa K.",
    city: "Saint-Louis",
    rating: 5,
    text: "Après mes séances de musculation, j'avais des courbatures qui duraient. PULSE en shaker post-effort fait partie de ma récup.",
    product_id: "pulse",
    product_name: "PULSE",
    is_visible: true,
    created_at: "2026-01-18T00:00:00.000Z",
  },
  {
    id: "pu2",
    name: "Omar B.",
    city: "Dakar",
    rating: 5,
    text: "Avant le foot du dimanche, je manquais de punch. PULSE en eau fraîche 30 min avant le match — plus de boisson énergisante chimique.",
    product_id: "pulse",
    product_name: "PULSE",
    is_visible: true,
    created_at: "2026-02-08T00:00:00.000Z",
  },
  {
    id: "pu3",
    name: "Awa N.",
    city: "Thiès",
    rating: 5,
    text: "Journées de boulot intenses + course le soir. PULSE le matin me donne la vitalité pour tenir sans m'effondrer à 16 h.",
    product_id: "pulse",
    product_name: "PULSE",
    is_visible: true,
    created_at: "2026-02-28T00:00:00.000Z",
  },
  // CALM — sommeil, stress du soir, détente, récupération mentale
  {
    id: "c1",
    name: "Khady B.",
    city: "Mbour",
    rating: 5,
    text: "Je peinais à décrocher le soir après les écrans. CALM en lait chaud 1 h avant le coucher m'aide à m'apaiser.",
    product_id: "calm",
    product_name: "CALM",
    is_visible: true,
    created_at: "2026-01-22T00:00:00.000Z",
  },
  {
    id: "c2",
    name: "Mame Diarra S.",
    city: "Dakar",
    rating: 5,
    text: "Le stress du travail me suivait jusqu'au lit. Le rituel verveine-camomille chaud est devenu mon signal « journée terminée ».",
    product_id: "calm",
    product_name: "CALM",
    is_visible: true,
    created_at: "2026-02-12T00:00:00.000Z",
  },
  {
    id: "c3",
    name: "Yacine F.",
    city: "Rufisque",
    rating: 5,
    text: "Sommeil léger et réveils nocturnes. CALM le soir ne remplace pas un médecin, mais ma routine du soir est plus sereine.",
    product_id: "calm",
    product_name: "CALM",
    is_visible: true,
    created_at: "2026-03-08T00:00:00.000Z",
  },
];

export function getTestimonialsForProduct(
  slug: string,
  all: Testimonial[] = SEED_TESTIMONIALS
): Testimonial[] {
  return all.filter((t) => t.product_id === slug && t.is_visible);
}

export function getFeaturedTestimonials(
  limit = 5,
  all: Testimonial[] = SEED_TESTIMONIALS
): Testimonial[] {
  const featured = ["w1", "b1", "p1", "pu1", "c1"];
  const picked = featured
    .map((id) => all.find((t) => t.id === id))
    .filter((t): t is Testimonial => Boolean(t));
  return picked.length >= limit ? picked.slice(0, limit) : all.slice(0, limit);
}
