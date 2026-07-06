import type { Testimonial } from "@/types/database";

/**
 * Témoignages illustratifs — alignés sur le positionnement réel de chaque rituel.
 * À remplacer par de vrais retours clients via l'admin.
 */
export const SEED_TESTIMONIALS: Testimonial[] = [
  // WELLNESS — digestion, énergie matinale, routine bien-être quotidien
  {
    id: "w1",
    name: "Aminata D.",
    city: "Dakar",
    rating: 5,
    text: "Je me levais sans élan malgré une bonne nuit. WELLNESS chaud le matin est devenu mon rituel de départ — plus léger qu'un second café.",
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
    text: "Souvent l'estomac lourd après le déjeuner. Une tasse de WELLNESS à l'eau tiède le matin m'aide à mieux digérer au fil des semaines.",
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
    text: "Je voulais une routine locale, naturelle et régulière. WELLNESS en smoothie frais l'après-midi complète bien mon petit-déjeuner.",
    product_id: "wellness",
    product_name: "WELLNESS",
    is_visible: true,
    created_at: "2026-02-20T00:00:00.000Z",
  },
  // BLOOM — grossesse, post-partum, allaitement, douceur, réconfort (pas énergie « tenir la journée »)
  {
    id: "b1",
    name: "Fatou S.",
    city: "Thiès",
    rating: 5,
    text: "Enceinte de 6 mois, les nausées du matin me gênaient. BLOOM au lait chaud passe doucement et ne m'agresse pas l'estomac.",
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
    text: "En post-partum, je manquais de temps pour moi. BLOOM au lait tiède le matin, c'est mon quart d'heure cocooning avant le réveil de bébé.",
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
    text: "En allaitement, je cherchais quelque chose de gourmand sans être trop lourd. BLOOM en milkshake tiède l'après-midi me rassure et me fait plaisir.",
    product_id: "bloom",
    product_name: "BLOOM",
    is_visible: true,
    created_at: "2026-03-01T00:00:00.000Z",
  },
  // PERIOD! — confort du cycle, règles, ballonnements, rituel apaisant
  {
    id: "p1",
    name: "Marième N.",
    city: "Dakar",
    rating: 5,
    text: "Avant mes règles, je suis souvent ballonnée et irritable. PERIOD! en tisane chaude le soir m'apporte un vrai moment de confort.",
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
    text: "Pendant le cycle, mon ventre est sensible. Le rituel bissap-cannelle chaud le matin m'aide à traverser ces jours plus sereinement.",
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
    text: "Je voulais un rituel naturel pour mes règles, sans promesses miracles. PERIOD! est devenu mon réflexe les jours où j'ai besoin de douceur.",
    product_id: "period",
    product_name: "PERIOD!",
    is_visible: true,
    created_at: "2026-03-05T00:00:00.000Z",
  },
  // PULSE — sport, énergie, récupération, vitalité (seul rituel « tenir l'effort / la journée active »)
  {
    id: "pu1",
    name: "Moussa K.",
    city: "Saint-Louis",
    rating: 5,
    text: "Après la musculation, j'avais du mal à récupérer. PULSE en shaker frais post-séance fait partie de ma routine depuis deux mois.",
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
    text: "Avant le foot du dimanche, je manquais de punch. PULSE en eau fraîche une demi-heure avant le match — fini les boissons chimiques.",
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
    text: "Bureau le jour, course le soir. PULSE le matin me donne l'énergie pour enchaîner sans m'effondrer en milieu d'après-midi.",
    product_id: "pulse",
    product_name: "PULSE",
    is_visible: true,
    created_at: "2026-02-28T00:00:00.000Z",
  },
  // CALM — sommeil, détente du soir, récupération, apaisement
  {
    id: "c1",
    name: "Khady B.",
    city: "Mbour",
    rating: 5,
    text: "Difficile de décrocher après les écrans. CALM en lait chaud une heure avant le coucher m'aide à ralentir et à m'endormir plus facilement.",
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
    text: "Le stress du travail me suivait jusqu'au lit. Ma tisane verveine-camomille chaude est devenue mon signal que la journée s'arrête.",
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
    text: "Sommeil léger, réveils nocturnes. CALM le soir ne remplace pas un médecin, mais ma routine du coucher est plus calme et régulière.",
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
