import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data/queries";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="section-padding">
      <div className="container-bovinia max-w-3xl">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-forest/60 hover:text-forest">
          <ArrowLeft size={16} />
          Retour au blog
        </Link>

        <p className="text-sm text-foreground/50">
          {post.published_at && formatDate(post.published_at)} · {post.category} · {post.author}
        </p>
        <h1 className="mt-4 font-serif text-4xl text-forest md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-foreground/70">{post.excerpt}</p>

        <div
          className="prose-bovinia mt-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-cream px-3 py-1 text-xs text-forest">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
