import type { Testimonial } from "@/types/database";

/**
 * Témoignages seed — certains sont illustratifs en attendant les vrais retours clients.
 * Remplaçables via l'admin Supabase ou en mettant à jour ce fichier.
 */
export const SEED_TESTIMONIALS: Testimonial[] = [
  // WELLNESS
  {
    id: "w1",
    name: "Aminata D.",
    city: "Dakar",
    rating: 5,
    text: "J'adore le goût tropical de WELLNESS. C'est devenu mon rituel du matin — chaud, facile et vraiment gourmand.",
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
    text: "Je le prends avant le bureau. En smoothie frais l'été, en eau chaude l'hiver — très pratique.",
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
    text: "Le goût ananas-mandarine masque bien le Bone Broth. Ma famille a adopté le rituel du matin.",
    product_id: "wellness",
    product_name: "WELLNESS",
    is_visible: true,
    created_at: "2026-02-20T00:00:00.000Z",
  },
  // BLOOM
  {
    id: "b1",
    name: "Fatou S.",
    city: "Thiès",
    rating: 5,
    text: "BLOOM m'accompagne depuis ma grossesse. Doux, crémeux — je le prends au lait chaud l'après-midi.",
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
    text: "Post-partum, c'est devenu mon allié nutrition. Saveur mangue-coco très réconfortante.",
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
    text: "Ma sage-femme m'avait recommandé une alimentation naturelle. BLOOM s'intègre parfaitement à ma routine.",
    product_id: "bloom",
    product_name: "BLOOM",
    is_visible: true,
    created_at: "2026-03-01T00:00:00.000Z",
  },
  // PERIOD!
  {
    id: "p1",
    name: "Marième N.",
    city: "Dakar",
    rating: 5,
    text: "PERIOD! m'accompagne pendant mes règles. Je le prends chaud le soir, c'est devenu un réflexe.",
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
    text: "Les saveurs gingembre-cannelle sont apaisantes. Je le combine avec CALM le soir pendant le cycle.",
    product_id: "period",
    product_name: "PERIOD!",
    is_visible: true,
    created_at: "2026-02-15T00:00:00.000Z",
  },
  {
    id: "p3",
    name: "Sophie L.",
    city: "Dakar",
    rating: 4,
    text: "Rituel réconfortant en tisane chaude. J'apprécie la douceur et la régularité du produit.",
    product_id: "period",
    product_name: "PERIOD!",
    is_visible: true,
    created_at: "2026-03-05T00:00:00.000Z",
  },
  // PULSE
  {
    id: "pu1",
    name: "Moussa K.",
    city: "Saint-Louis",
    rating: 5,
    text: "PULSE est parfait après mes séances de sport. Le gingembre apporte une touche dynamique.",
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
    text: "Avant le foot le dimanche, c'est mon boost naturel. Goût fruité, pas chimique.",
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
    text: "Je cours le matin — PULSE en eau fraîche avant l'effort, parfait pour moi.",
    product_id: "pulse",
    product_name: "PULSE",
    is_visible: true,
    created_at: "2026-02-28T00:00:00.000Z",
  },
  // CALM
  {
    id: "c1",
    name: "Khady B.",
    city: "Mbour",
    rating: 5,
    text: "CALM le soir avant de dormir — une routine apaisante. Vanille et cannelle, très doux.",
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
    text: "En lait chaud le soir, c'est mon moment pour décompresser après la journée.",
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
    text: "Le pack découverte m'a fait découvrir CALM — maintenant c'est mon rituel du soir fixe.",
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
