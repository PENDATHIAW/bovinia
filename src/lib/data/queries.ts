import type {
  BlogPost,
  FAQ,
  Product,
  SiteSettings,
  Testimonial,
} from "@/types/database";
import { SEED_PRODUCTS } from "@/lib/data/products";
import {
  SEED_TESTIMONIALS,
  getFeaturedTestimonials,
  getTestimonialsForProduct as filterTestimonialsByProduct,
} from "@/lib/data/testimonials";
import { mergeProductGallery } from "@/lib/data/discoverAssets";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  hero_title: "Cinq rituels. Une base : le Bone Broth.",
  hero_subtitle:
    "BOVINIA transforme la puissance du bouillon d'os en boissons gourmandes et modernes — enrichies de fruits et plantes africains, fabriquées au Sénégal, prêtes à commander.",
  hero_cta_primary: "Découvrir la boutique",
  hero_cta_secondary: "Commander",
  whatsapp_number: "+221 78 589 01 53",
  contact_email: "contact@bovinia.sn",
  contact_address: "Dakar, Sénégal",
  instagram_url: "https://instagram.com/bovinia",
  tiktok_url: "https://tiktok.com/@bovinia",
  facebook_url: "",
  site_title: "BOVINIA — Nutrition fonctionnelle powered by Bone Broth",
  site_description:
    "BOVINIA transforme le Bone Broth en rituels nutritionnels gourmands. 5 formules premium fabriquées au Sénégal.",
  footer_tagline: "Cinq rituels gourmands. Une base : le Bone Broth. Fabriqué au Sénégal.",
};

export const SEED_FAQS: FAQ[] = [
  {
    id: "1",
    question: "Qu'est-ce que le Bone Broth ?",
    answer:
      "Le Bone Broth est un bouillon longuement préparé à partir de tissus conjonctifs sélectionnés (os, tendons, articulations), naturellement riches en collagène, gélatine, acides aminés et minéraux. BOVINIA le transforme en poudre premium, facile à utiliser et agréable à boire — enrichie de fruits et plantes africains.",
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    question: "Est-ce que BOVINIA est un médicament ?",
    answer:
      "Non. BOVINIA est un aliment fonctionnel, pas un médicament. Nos produits ne sont pas destinés à diagnostiquer, traiter, guérir ou prévenir une maladie. Ils accompagnent votre routine nutritionnelle quotidienne.",
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    question: "Comment consommer les produits ?",
    answer:
      "Tous nos rituels se préparent à l'eau chaude. WELLNESS, BLOOM et PULSE se consomment plutôt le matin ; CALM le soir ; PERIOD! le matin ou le soir selon votre cycle. Mélangez 15 à 17 g dans 200 ml de liquide — environ 30 portions par pot.",
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    question: "Est-ce adapté aux femmes enceintes ?",
    answer:
      "BLOOM accompagne les femmes enceintes et en post-partum. Consultez votre professionnel de santé avant d'intégrer tout nouveau produit à votre alimentation.",
    sort_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    question: "Combien de fois par jour peut-on en prendre ?",
    answer:
      "Une à deux portions par jour suffisent généralement pour intégrer BOVINIA à votre routine. Adaptez selon vos besoins et préférences, en respectant les indications de chaque rituel.",
    sort_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    question: "Les produits contiennent-ils du sel ou des sucres ajoutés ?",
    answer:
      "Non. Nos formules sont élaborées sans sel ajouté et sans sucres ajoutés, sans colorants artificiels et sans conservateurs artificiels. Riches en collagène et en protéines selon analyses, fabriquées au Sénégal.",
    sort_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    question: "Où acheter BOVINIA ?",
    answer:
      "Commandez sur bovinia.sn/commander : ajoutez vos rituels au panier, renseignez la livraison et confirmez. Votre commande est validée immédiatement sur le site, avec un email récapitulatif.",
    sort_order: 7,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    question: "Est-ce disponible à l'international ?",
    answer:
      "Notre ambition est exportable. Nous préparons activement la distribution locale et internationale. Contactez-nous pour les demandes d'export.",
    sort_order: 8,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    question: "Pourquoi le Bone Broth fait-il parler de lui sur TikTok ?",
    answer:
      "Aux États-Unis et en Europe, le bouillon d'os est devenu un rituel bien-être viral : les créateurs partagent leurs recettes, leurs routines matinales et leurs ressentis. BOVINIA adapte cette tendance au Sénégal — fabrication locale, fruits et plantes africains, format poudre pratique.",
    sort_order: 9,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    question: "Quels sont les bienfaits du Bone Broth pour l'organisme ?",
    answer:
      "Traditionnellement consommé chaud, le Bone Broth apporte naturellement du collagène, de la gélatine, des acides aminés (glycine, proline…) et des minéraux issus des os. Il accompagne une alimentation équilibrée — confort digestif, routine réconfortante, nutrition de l'intérieur. Ce n'est pas un médicament.",
    sort_order: 10,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    question: "Est-ce connu au Sénégal ?",
    answer:
      "Le bouillon d'os sous forme premium en poudre est encore peu connu au Sénégal. BOVINIA est pionnière : nous transformons localement des ressources d'élevage (via Horizon Farm) en rituels gourmands accessibles, sans dépendre de compléments importés.",
    sort_order: 11,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export { SEED_TESTIMONIALS } from "@/lib/data/testimonials";

export const SEED_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Qu'est-ce que le Bone Broth et pourquoi l'intégrer à sa routine ?",
    slug: "quest-ce-que-le-bone-broth",
    excerpt:
      "Découvrez les bases du Bone Broth, cette tradition millénaire revisitée par BOVINIA en poudre premium.",
    content:
      "<h2>Le bouillon d'os, une tradition millénaire</h2><p>Le <strong>Bone Broth</strong> — le bouillon d'os — est obtenu en faisant mijoter longuement des os, tendons et articulations de bœuf. Cette cuisson lente extrait naturellement le <strong>collagène</strong>, la <strong>gélatine</strong>, des <strong>acides aminés</strong> (glycine, proline, glutamine…) et des <strong>minéraux</strong>.</p><h2>Pourquoi tout le monde en parle sur TikTok</h2><p>Depuis plusieurs années, le Bone Broth est devenu un phénomène sur TikTok et Instagram : des millions de vidéos montrent des routines matinales, des recettes réconfortantes et des témoignages sur la vitalité et le bien-être digestif. Aux États-Unis et en Europe, c'est déjà un pilier de la nutrition fonctionnelle.</p><h2>Et au Sénégal ?</h2><p><strong>Très peu de Sénégalais connaissent le Bone Broth</strong> sous cette forme moderne et premium. Personne ne le propose encore en poudre gourmande, fabriquée localement. BOVINIA est pionnière : nous avons voulu apporter cette tendance mondiale au pays, avec nos propres fruits et plantes — baobab, kinkeliba, bissap, gingembre, camomille…</p><h2>Les bienfaits pour l'organisme</h2><p>Consommé chaud, le bouillon d'os accompagne traditionnellement une alimentation équilibrée. Il apporte des nutriments que l'organisme utilise pour entretenir les tissus, le confort digestif et une routine réconfortante. Ce n'est pas un médicament — c'est un aliment fonctionnel.</p><h2>Comment BOVINIA le rend accessible</h2><p>Nous transformons le Bone Broth en <strong>poudre premium</strong>, dosée en cuillère, à mélanger avec 200 ml d'eau chaude ou froide. Cinq rituels ciblent des besoins différents (énergie, maternité, cycle, sport, sommeil), mais une seule base : le Bone Broth fabriqué au Sénégal via <a href='/horizon-farm'>Horizon Farm</a>.</p>",
    cover_image: null,
    category: "Bone Broth",
    tags: ["bone broth", "collagène", "routine"],
    status: "published",
    author: "Équipe BOVINIA",
    published_at: new Date().toISOString(),
    seo_title: "Qu'est-ce que le Bone Broth ? | BOVINIA",
    seo_description: "Guide complet sur le Bone Broth et son intégration dans une routine nutritionnelle.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function withAutoGallery(product: Product): Product {
  return {
    ...product,
    gallery: mergeProductGallery(product.gallery ?? [], product.slug),
  };
}

function enrichProductFromSeed(row: Product): Product {
  const seed = SEED_PRODUCTS.find((p) => p.slug === row.slug);
  if (!seed) return row;

  // Toujours utiliser les visuels du repo — la base Supabase peut contenir d'anciennes URLs cassées.
  return {
    ...row,
    image: seed.image,
    gallery: seed.gallery,
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_PRODUCTS;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("status", ["visible", "preorder", "coming_soon"])
    .order("sort_order");

  if (error || !data?.length) return SEED_PRODUCTS.map(withAutoGallery);
  return (data as Product[]).map(enrichProductFromSeed).map(withAutoGallery);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  if (!supabase) {
    const product = SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
    return product ? withAutoGallery(product) : null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    const product = SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
    return product ? withAutoGallery(product) : null;
  }
  return withAutoGallery(enrichProductFromSeed(data as Product));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  if (!supabase) return DEFAULT_SITE_SETTINGS;

  const { data } = await supabase.from("site_settings").select("*").single();
  if (!data) return DEFAULT_SITE_SETTINGS;
  return data as SiteSettings;
}

export async function getFAQs(): Promise<FAQ[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_FAQS;

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error || !data?.length) return SEED_FAQS;
  return data as FAQ[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_TESTIMONIALS;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  if (error || !data?.length) return SEED_TESTIMONIALS;
  return data as Testimonial[];
}

/** Témoignages pour une fiche produit — DB + seed illustratif si besoin. */
export async function getProductTestimonials(slug: string): Promise<Testimonial[]> {
  const all = await getTestimonials();
  const fromDb = filterTestimonialsByProduct(slug, all);
  if (fromDb.length >= 2) return fromDb.slice(0, 3);

  const fromSeed = filterTestimonialsByProduct(slug, SEED_TESTIMONIALS);
  const ids = new Set(fromDb.map((t) => t.id));
  return [...fromDb, ...fromSeed.filter((t) => !ids.has(t.id))].slice(0, 3);
}

export async function getFeaturedTestimonialsForHome(): Promise<Testimonial[]> {
  const all = await getTestimonials();
  const featured = getFeaturedTestimonials(5, all);
  return featured.length >= 3 ? featured : getFeaturedTestimonials(5, SEED_TESTIMONIALS);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_BLOG_POSTS;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data?.length) return SEED_BLOG_POSTS;
  return data as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  if (!supabase) {
    return SEED_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return SEED_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  }
  return data as BlogPost;
}

export async function getAdminProducts(): Promise<Product[]> {
  const supabase = await createServiceClient();
  if (!supabase) return SEED_PRODUCTS;

  const { data } = await supabase.from("products").select("*").order("sort_order");
  return (data as Product[]) ?? SEED_PRODUCTS;
}
