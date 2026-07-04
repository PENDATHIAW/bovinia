export type UserRole =
  | "super_admin"
  | "admin"
  | "editor"
  | "order_manager";

export type ProductStatus =
  | "draft"
  | "visible"
  | "preorder"
  | "out_of_stock"
  | "coming_soon";

export type PreorderStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "paid"
  | "delivered"
  | "cancelled";

export type OrderPaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export type OrderDeliveryStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type BlogStatus = "draft" | "published";

export type ProductCategory =
  | "bien-etre"
  | "grossesse"
  | "cycle-feminin"
  | "sport"
  | "sommeil";

export interface Product {
  id: string;
  name: string;
  slug: string;
  mission: string;
  short_description: string;
  long_description: string;
  target_audience: string;
  usage_moment: string;
  preparation_methods: string[];
  dominant_flavors: string[];
  main_ingredients: string[];
  warnings: string;
  price: number | null;
  compare_at_price: number | null;
  stock: number;
  status: ProductStatus;
  category: ProductCategory;
  color_theme: string;
  image: string | null;
  gallery: string[];
  seo_title: string | null;
  seo_description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Preorder {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  city: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  preferred_channel: "whatsapp" | "call" | "email";
  message: string | null;
  status: PreorderStatus;
  internal_note: string | null;
  marketing_consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  status: BlogStatus;
  author: string;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  product_id: string | null;
  product_name: string | null;
  is_visible: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  whatsapp_number: string;
  contact_email: string;
  contact_address: string;
  instagram_url: string;
  tiktok_url: string;
  facebook_url: string;
  site_title: string;
  site_description: string;
  footer_tagline: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: OrderItem[];
  total: number;
  payment_status: OrderPaymentStatus;
  delivery_status: OrderDeliveryStatus;
  payment_method: string | null;
  address: string;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  source: string;
  marketing_consent: boolean;
  created_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  page_path: string | null;
  product_slug: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

export const PRODUCT_COLORS: Record<string, { bg: string; text: string; accent: string; border: string }> = {
  wellness: { bg: "bg-[#8B9A7D]", text: "text-[#8B9A7D]", accent: "#8B9A7D", border: "border-[#8B9A7D]" },
  bloom: { bg: "bg-[#D4A5A5]", text: "text-[#D4A5A5]", accent: "#D4A5A5", border: "border-[#D4A5A5]" },
  period: { bg: "bg-[#722F37]", text: "text-[#722F37]", accent: "#722F37", border: "border-[#722F37]" },
  pulse: { bg: "bg-[#C45C26]", text: "text-[#C45C26]", accent: "#C45C26", border: "border-[#C45C26]" },
  calm: { bg: "bg-[#1B2A4A]", text: "text-[#1B2A4A]", accent: "#1B2A4A", border: "border-[#1B2A4A]" },
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "bien-etre": "Bien-être",
  grossesse: "Grossesse",
  "cycle-feminin": "Cycle féminin",
  sport: "Sport",
  sommeil: "Sommeil",
};

export const BLOG_CATEGORIES = [
  "Nutrition",
  "Bone Broth",
  "Grossesse & post-partum",
  "Cycle féminin",
  "Sport & récupération",
  "Sommeil",
  "Bien-être naturel",
  "Coulisses BOVINIA",
] as const;
