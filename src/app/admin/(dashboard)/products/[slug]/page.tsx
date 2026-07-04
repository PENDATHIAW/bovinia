import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data/queries";
import { ProductEditForm } from "@/components/admin/ProductEditForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminProductEditPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return <ProductEditForm product={product} />;
}
