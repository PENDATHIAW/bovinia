import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data/queries";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/public/PageHero";
import { OfficialAssetImage } from "@/components/public/OfficialAssetImage";
import { ASSETS } from "@/lib/data/assetPaths";

export const metadata: Metadata = {
  title: "Conseils & Blog",
  description:
    "Articles, conseils nutritionnels et coulisses BOVINIA sur le Bone Broth et le bien-être naturel.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero
        label="Blog"
        title="Conseils & inspiration"
        description="Nutrition, Bone Broth, bien-être et coulisses de la marque."
      />

      <div className="section-padding surface-cream">
        <div className="container-bovinia">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="card-premium card-lift group overflow-hidden">
                <div className="relative h-48 overflow-hidden bg-cream">
                  <OfficialAssetImage
                    src={post.cover_image ?? ASSETS.heroRange}
                    alt={post.title}
                    className="image-zoom h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-gold/30 bg-ivory/90 px-3 py-1 text-xs font-medium text-forest">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-foreground/50">
                    {post.published_at && formatDate(post.published_at)}
                  </p>
                  <h2 className="mt-2 font-serif text-xl text-forest transition-colors group-hover:text-gold">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/70">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold transition-colors hover:text-forest"
                  >
                    Lire l&apos;article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
