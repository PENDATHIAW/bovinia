import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Flame } from "lucide-react";
import { getProductBySlug, getProducts, getSiteSettings } from "@/lib/data/queries";
import { getRelatedProducts } from "@/lib/shop/relatedProducts";
import { ProductPotImage } from "@/components/public/ProductPotImage";
import { ProductLifestyleSection } from "@/components/public/ProductLifestyleSection";
import { ProductConsumptionGuide } from "@/components/public/ProductConsumptionGuide";
import { ProductDetailActions } from "@/components/public/ProductDetailActions";
import { RelatedProducts } from "@/components/public/RelatedProducts";
import { formatPrice } from "@/lib/utils";
import { USAGE_TIME_BY_SLUG } from "@/lib/data/consumption";
import { getProductAvailabilityLabel } from "@/lib/product-availability";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };

  return {
    title: product.seo_title ?? product.name,
    description: product.seo_description ?? product.short_description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [product, allProducts, settings] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
    getSiteSettings(),
  ]);

  if (!product) notFound();

  const related = getRelatedProducts(product, allProducts);
  const usageTime = USAGE_TIME_BY_SLUG[product.slug];
  const whatsappUrl = `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour, j'ai une question sur ${product.name} BOVINIA.`)}`;

  return (
    <div className="section-padding pb-28 md:pb-16">
      <div className="container-bovinia">
        <Link
          href="/produits"
          className="mb-8 inline-flex items-center gap-2 text-sm text-forest/60 hover:text-forest"
        >
          <ArrowLeft size={16} />
          Retour au catalogue
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <ProductPotImage product={product} size="lg" className="w-full" priority />

          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-gold">{product.mission}</p>
            <h1 className="mt-2 font-serif text-4xl text-forest">{product.name}</h1>
            <p className="mt-2 text-foreground/60">{product.dominant_flavors.join(" • ")}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {usageTime && (
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream px-4 py-2 text-sm font-medium text-forest">
                  {usageTime.label}
                </span>
              )}
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-ivory px-4 py-2 text-sm text-forest">
                <Flame size={16} className="text-gold" />
                Se déguste chaud — et aussi frais
              </span>
            </div>

            {product.price && (
              <p className="mt-4 font-serif text-2xl text-forest">{formatPrice(product.price)}</p>
            )}
            <p className="mt-1 text-sm text-foreground/50">
              Format : 500 g · ~30 portions · {getProductAvailabilityLabel(product.status)}
            </p>

            <p className="mt-6 leading-relaxed text-foreground/70">{product.long_description}</p>

            <div className="mt-8 space-y-4">
              <div className="card-premium border-l-4 border-l-gold/50 p-5">
                <h2 className="font-serif text-lg text-forest">Pour qui ?</h2>
                <p className="mt-2 text-sm text-foreground/70">{product.target_audience}</p>
              </div>
              <div className="card-premium border-l-4 border-l-gold/50 p-5">
                <h2 className="font-serif text-lg text-forest">Quand le consommer ?</h2>
                <p className="mt-2 text-sm text-foreground/70">{product.usage_moment}</p>
              </div>
              <div className="card-premium border-l-4 border-l-gold/50 p-5">
                <h2 className="font-serif text-lg text-forest">Ingrédients principaux</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {product.main_ingredients.map((ing) => (
                    <li key={ing} className="rounded-full border border-gold/20 bg-cream px-3 py-1 text-xs text-forest">
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-gold/25 bg-cream/60 p-4 text-sm text-forest/80">
              {product.warnings}
            </div>

            <ProductDetailActions product={product} whatsappUrl={whatsappUrl} />
          </div>
        </div>

        <ProductLifestyleSection product={product} />

        <div className="mt-12 max-w-3xl">
          <ProductConsumptionGuide slug={product.slug} />
        </div>

        <RelatedProducts products={related} currentSlug={product.name} />
      </div>
    </div>
  );
}
