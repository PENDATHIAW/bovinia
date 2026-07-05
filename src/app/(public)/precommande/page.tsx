import { redirect } from "next/navigation";

/** Ancienne URL waitlist → boutique */
export default async function PrecommandeRedirect({
  searchParams,
}: {
  searchParams: Promise<{ produit?: string; pack?: string }>;
}) {
  const { produit, pack } = await searchParams;
  const q = new URLSearchParams();
  if (produit) q.set("produit", produit);
  if (pack) q.set("pack", pack);
  const query = q.toString();
  redirect(query ? `/commander?${query}` : "/commander");
}
