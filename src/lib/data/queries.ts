import type {
  BlogPost,
  FAQ,
  Product,
  SiteSettings,
  Testimonial,
} from "@/types/database";
import { SEED_PRODUCTS } from "@/lib/data/products";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  hero_title: "Le rituel nutritionnel nouvelle génération, powered by Bone Broth.",
  hero_subtitle:
    "BOVINIA transforme la richesse naturelle du Bone Broth en rituels gourmands pour accompagner votre bien-être au quotidien.",
  hero_cta_primary: "Découvrir la gamme",
  hero_cta_secondary: "Précommander",
  whatsapp_number: "+221771234567",
  contact_email: "contact@bovinia.sn",
  contact_address: "Dakar, Sénégal",
  instagram_url: "https://instagram.com/bovinia",
  tiktok_url: "https://tiktok.com/@bovinia",
  facebook_url: "",
  site_title: "BOVINIA — Nutrition fonctionnelle powered by Bone Broth",
  site_description:
    "BOVINIA transforme le Bone Broth en rituels nutritionnels gourmands. 5 formules premium fabriquées au Sénégal.",
  footer_tagline: "Nourrir votre corps, naturellement.",
};

export const SEED_FAQS: FAQ[] = [
  {
    id: "1",
    question: "Qu'est-ce que le Bone Broth ?",
    answer:
      "Le Bone Broth est un bouillon longuement préparé à partir de tissus conjonctifs sélectionnés (os, tendons, articulations), naturellement riches en collagène, gélatine, acides aminés et minéraux. BOVINIA le transforme en poudre premium, facile à utiliser et agréable à boire.",
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
      "Mélangez une cuillère doseuse (environ 10 g) dans 200 ml d'eau chaude ou froide, de lait, du lait végétal ou un smoothie. Chaque rituel a ses modes de consommation recommandés, indiqués sur la fiche produit.",
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    question: "Est-ce adapté aux femmes enceintes ?",
    answer:
      "BLOOM a été conçu pour accompagner les femmes enceintes et jeunes mamans. Nous recommandons toutefois de consulter votre professionnel de santé avant d'intégrer tout nouveau produit à votre alimentation.",
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
    question: "Les produits contiennent-ils du sel ajouté ?",
    answer:
      "Non. Nos formules sont élaborées sans sel ajouté, sans colorants artificiels et sans conservateurs artificiels.",
    sort_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    question: "Où acheter BOVINIA ?",
    answer:
      "BOVINIA est actuellement en phase de précommande. Inscrivez-vous sur notre waitlist pour être informé(e) du lancement et des points de vente.",
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
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Aminata D.",
    city: "Dakar",
    rating: 5,
    text: "J'adore le goût tropical de WELLNESS. C'est devenu mon rituel du matin, facile et gourmand.",
    product_id: "wellness",
    product_name: "WELLNESS",
    is_visible: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Fatou S.",
    city: "Thiès",
    rating: 5,
    text: "BLOOM m'accompagne depuis ma grossesse. Une formule douce que j'apprécie vraiment au quotidien.",
    product_id: "bloom",
    product_name: "BLOOM",
    is_visible: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Moussa K.",
    city: "Saint-Louis",
    rating: 4,
    text: "PULSE est parfait après mes séances de sport. Le gingembre apporte une touche dynamique.",
    product_id: "pulse",
    product_name: "PULSE",
    is_visible: true,
    created_at: new Date().toISOString(),
  },
];

export const SEED_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Qu'est-ce que le Bone Broth et pourquoi l'intégrer à sa routine ?",
    slug: "quest-ce-que-le-bone-broth",
    excerpt:
      "Découvrez les bases du Bone Broth, cette tradition millénaire revisitée par BOVINIA en poudre premium.",
    content:
      "<p>Le Bone Broth, ou bouillon d'os, est préparé en faisant mijoter longuement des tissus conjonctifs sélectionnés. Cette préparation traditionnelle est naturellement riche en collagène, gélatine et acides aminés.</p><p>BOVINIA transforme cette richesse en poudre moderne, facile à intégrer à votre quotidien sous forme de rituels gourmands.</p>",
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

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  if (!supabase) return SEED_PRODUCTS;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("status", ["visible", "preorder", "coming_soon"])
    .order("sort_order");

  if (error || !data?.length) return SEED_PRODUCTS;
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  if (!supabase) {
    return SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  return data as Product;
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
