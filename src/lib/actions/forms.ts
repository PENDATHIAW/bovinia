"use server";

import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const preorderSchema = z.object({
  full_name: z.string().min(2, "Nom requis"),
  phone: z.string().min(8, "Téléphone requis"),
  email: z.string().email("Email invalide"),
  city: z.string().min(2, "Ville requise"),
  product_name: z.string().min(1, "Produit requis"),
  quantity: z.coerce.number().min(1).max(20).default(1),
  preferred_channel: z.enum(["whatsapp", "call", "email"]).default("whatsapp"),
  message: z.string().optional(),
  marketing_consent: z.coerce.boolean().default(false),
  website: z.string().max(0).optional(),
});

const contactSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
  website: z.string().max(0).optional(),
});

const newsletterSchema = z.object({
  email: z.string().email(),
  full_name: z.string().optional(),
  phone: z.string().optional(),
  marketing_consent: z.coerce.boolean().default(false),
  website: z.string().max(0).optional(),
});

type ActionResult = { success: boolean; error?: string };

export async function submitPreorder(formData: FormData): Promise<ActionResult> {
  if (formData.get("website")) {
    return { success: true };
  }

  const parsed = preorderSchema.safeParse({
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    city: formData.get("city"),
    product_name: formData.get("product_name"),
    quantity: formData.get("quantity") || 1,
    preferred_channel: formData.get("preferred_channel") || "whatsapp",
    message: formData.get("message") || undefined,
    marketing_consent: formData.get("marketing_consent") === "true",
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const supabase = await createServiceClient();
  if (!supabase) {
    console.log("[Preorder fallback]", parsed.data);
    return { success: true };
  }

  const { error } = await supabase.from("preorders").insert({
    ...parsed.data,
    status: "new",
  });

  if (error) {
    console.error("Preorder error:", error);
    return { success: false, error: "Impossible d'enregistrer votre précommande." };
  }

  revalidatePath("/admin/preorders");
  return { success: true };
}

export async function submitContact(formData: FormData): Promise<ActionResult> {
  if (formData.get("website")) {
    return { success: true };
  }

  const parsed = contactSchema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const supabase = await createServiceClient();
  if (!supabase) {
    console.log("[Contact fallback]", parsed.data);
    return { success: true };
  }

  const { error } = await supabase.from("contact_messages").insert(parsed.data);
  if (error) {
    return { success: false, error: "Impossible d'envoyer votre message." };
  }

  revalidatePath("/admin/contacts");
  return { success: true };
}

export async function submitNewsletter(formData: FormData): Promise<ActionResult> {
  if (formData.get("website")) {
    return { success: true };
  }

  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    full_name: formData.get("full_name") || undefined,
    phone: formData.get("phone") || undefined,
    marketing_consent: formData.get("marketing_consent") === "true",
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return { success: false, error: "Email invalide." };
  }

  const supabase = await createServiceClient();
  if (!supabase) {
    return { success: true };
  }

  const { error } = await supabase.from("newsletter_subscribers").insert({
    ...parsed.data,
    source: "website",
  });

  if (error?.code === "23505") {
    return { success: false, error: "Cet email est déjà inscrit." };
  }
  if (error) {
    return { success: false, error: "Inscription impossible." };
  }

  return { success: true };
}

export async function trackEvent(
  eventType: string,
  pagePath?: string,
  productSlug?: string
) {
  const supabase = await createServiceClient();
  if (!supabase) return;

  await supabase.from("analytics_events").insert({
    event_type: eventType,
    page_path: pagePath,
    product_slug: productSlug,
    metadata: {},
  });
}
