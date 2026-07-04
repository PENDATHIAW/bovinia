import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data/queries";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Conseils & Blog",
  description:
    "Articles, conseils nutritionnels et coulisses BOVINIA sur le Bone Broth et le bien-être naturel.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="section-padding">
      <div className="container-bovinia">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Blog</p>
          <h1 className="mt-2 font-serif text-4xl text-forest">Conseils & inspiration</h1>
          <p className="mt-4 text-foreground/70">
            Nutrition, Bone Broth, bien-être et coulisses de la marque.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="card-premium group overflow-hidden">
              <div className="flex h-40 items-center justify-center bg-cream">
                <span className="font-serif text-2xl text-gold/40">{post.category}</span>
              </div>
              <div className="p-6">
                <p className="text-xs text-foreground/50">
                  {post.published_at && formatDate(post.published_at)} · {post.category}
                </p>
                <h2 className="mt-2 font-serif text-xl text-forest group-hover:text-forest-light">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 text-sm text-foreground/70">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-gold hover:underline"
                >
                  Lire l&apos;article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
