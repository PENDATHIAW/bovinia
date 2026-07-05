import type { MetadataRoute } from "next";
import { getProducts, getBlogPosts } from "@/lib/data/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bovinia.sn";
  const [products, posts] = await Promise.all([getProducts(), getBlogPosts()]);

  const staticPages = [
    "",
    "/produits",
    "/notre-histoire",
    "/horizon-farm",
    "/blog",
    "/contact",
    "/commander",
    "/livraison",
    "/quel-rituel",
    "/comparateur",
    "/preparation",
    "/bone-broth",
    "/mentions-legales",
    "/politique-confidentialite",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productPages = products.map((p) => ({
    url: `${baseUrl}/produits/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPages = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
