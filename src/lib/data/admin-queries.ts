import { createServiceClient, createClient } from "@/lib/supabase/server";
import { SEED_PRODUCTS } from "@/lib/data/products";
import { SEED_FAQS, SEED_TESTIMONIALS, SEED_BLOG_POSTS } from "@/lib/data/queries";

export async function getAdminStats() {
  const supabase = await createServiceClient();

  if (!supabase) {
    return {
      orders: 0,
      contacts: 0,
      newsletter: 0,
      blogPosts: SEED_BLOG_POSTS.length,
      products: SEED_PRODUCTS.length,
      revenue: 0,
      topProducts: SEED_PRODUCTS.map((p) => ({ name: p.name, count: 0 })),
      topCities: [] as { city: string; count: number }[],
    };
  }

  const [orders, contacts, newsletter, blogPosts, products, analytics] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("products").select("price, stock"),
    supabase.from("analytics_events").select("*", { count: "exact", head: true }),
  ]);

  const { data: ordersData } = await supabase.from("orders").select("city, total");
  const { data: orderItems } = await supabase.from("order_items").select("product_name");

  const productCounts: Record<string, number> = {};
  const cityCounts: Record<string, number> = {};

  orderItems?.forEach((item) => {
    productCounts[item.product_name] = (productCounts[item.product_name] || 0) + 1;
  });

  ordersData?.forEach((order) => {
    if (order.city) cityCounts[order.city] = (cityCounts[order.city] || 0) + 1;
  });

  const revenue = (ordersData ?? []).reduce((s, o) => s + (Number(o.total) || 0), 0);

  return {
    orders: orders.count ?? 0,
    contacts: contacts.count ?? 0,
    newsletter: newsletter.count ?? 0,
    blogPosts: blogPosts.count ?? 0,
    products: products.data?.length ?? 0,
    analytics: analytics.count ?? 0,
    revenue,
    topProducts: Object.entries(productCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    topCities: Object.entries(cityCounts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
  };
}

export async function getAdminPreorders() {
  const supabase = await createServiceClient();
  if (!supabase) return [];
  const { data } = await supabase.from("preorders").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminContacts() {
  const supabase = await createServiceClient();
  if (!supabase) return [];
  const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminNewsletter() {
  const supabase = await createServiceClient();
  if (!supabase) return [];
  const { data } = await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminOrders() {
  const supabase = await createServiceClient();
  if (!supabase) return { orders: [] as import("@/types/database").Order[], itemsByOrder: {} };

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: items } = await supabase.from("order_items").select("*");

  const itemsByOrder: Record<string, import("@/types/database").OrderItemRow[]> = {};
  items?.forEach((item) => {
    if (!itemsByOrder[item.order_id]) itemsByOrder[item.order_id] = [];
    itemsByOrder[item.order_id].push(item);
  });

  return {
    orders: (orders ?? []) as import("@/types/database").Order[],
    itemsByOrder,
  };
}

export async function getAdminBlogPosts() {
  const supabase = await createServiceClient();
  if (!supabase) return SEED_BLOG_POSTS;
  const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminFAQs() {
  const supabase = await createServiceClient();
  if (!supabase) return SEED_FAQS;
  const { data } = await supabase.from("faqs").select("*").order("sort_order");
  return data ?? [];
}

export async function getAdminTestimonials() {
  const supabase = await createServiceClient();
  if (!supabase) return SEED_TESTIMONIALS;
  const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminUser() {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile };
}

export async function getAnalyticsSummary() {
  const supabase = await createServiceClient();
  if (!supabase) {
    return { pageViews: 0, whatsappClicks: 0, productViews: 0 };
  }

  const { data } = await supabase.from("analytics_events").select("event_type");
  const counts: Record<string, number> = {};
  data?.forEach((e) => {
    counts[e.event_type] = (counts[e.event_type] || 0) + 1;
  });

  return {
    pageViews: counts["page_view"] ?? 0,
    whatsappClicks: counts["whatsapp_click"] ?? 0,
    productViews: counts["product_view"] ?? 0,
    total: data?.length ?? 0,
  };
}
