"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  if (!supabase) {
    return { error: "Supabase non configuré. Vérifiez les variables d'environnement." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "Email ou mot de passe incorrect." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function updatePreorderStatus(id: string, status: string, note?: string) {
  const supabase = await createClient();
  if (!supabase) return { error: "Non configuré" };

  const update: Record<string, string> = { status };
  if (note !== undefined) update.internal_note = note;

  const { error } = await supabase.from("preorders").update(update).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/preorders");
  return { success: true };
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) return { error: "Non configuré" };

  const id = formData.get("id") as string;
  const data = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    mission: formData.get("mission") as string,
    short_description: formData.get("short_description") as string,
    long_description: formData.get("long_description") as string,
    target_audience: formData.get("target_audience") as string,
    usage_moment: formData.get("usage_moment") as string,
    preparation_methods: (formData.get("preparation_methods") as string).split(",").map(s => s.trim()),
    dominant_flavors: (formData.get("dominant_flavors") as string).split(",").map(s => s.trim()),
    main_ingredients: (formData.get("main_ingredients") as string).split(",").map(s => s.trim()),
    price: parseFloat(formData.get("price") as string) || null,
    stock: parseInt(formData.get("stock") as string) || 0,
    status: formData.get("status") as string,
    category: formData.get("category") as string,
    color_theme: formData.get("color_theme") as string,
  };

  const { error } = await supabase.from("products").update(data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/produits");
  return { success: true };
}

export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) return { error: "Non configuré" };

  const data = {
    hero_title: formData.get("hero_title") as string,
    hero_subtitle: formData.get("hero_subtitle") as string,
    hero_cta_primary: formData.get("hero_cta_primary") as string,
    hero_cta_secondary: formData.get("hero_cta_secondary") as string,
    whatsapp_number: formData.get("whatsapp_number") as string,
    contact_email: formData.get("contact_email") as string,
    contact_address: formData.get("contact_address") as string,
    instagram_url: formData.get("instagram_url") as string,
    tiktok_url: formData.get("tiktok_url") as string,
    site_title: formData.get("site_title") as string,
    site_description: formData.get("site_description") as string,
    footer_tagline: formData.get("footer_tagline") as string,
  };

  const { error } = await supabase.from("site_settings").upsert({ id: 1, ...data });
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) return { error: "Non configuré" };

  const { error } = await supabase.from("blog_posts").insert({
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    author: formData.get("author") as string || "Équipe BOVINIA",
    published_at: formData.get("status") === "published" ? new Date().toISOString() : null,
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function createFAQ(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) return { error: "Non configuré" };

  const { error } = await supabase.from("faqs").insert({
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    sort_order: parseInt(formData.get("sort_order") as string) || 0,
    is_active: formData.get("is_active") === "true",
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/faq");
  return { success: true };
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) return { error: "Non configuré" };

  const { error } = await supabase.from("testimonials").insert({
    name: formData.get("name") as string,
    city: formData.get("city") as string,
    rating: parseInt(formData.get("rating") as string) || 5,
    text: formData.get("text") as string,
    product_name: formData.get("product_name") as string || null,
    is_visible: formData.get("is_visible") === "true",
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function markContactRead(id: string) {
  const supabase = await createClient();
  if (!supabase) return;

  await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin/contacts");
}

export async function markContactReadAction(id: string) {
  "use server";
  await markContactRead(id);
}
