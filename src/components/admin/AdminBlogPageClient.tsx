"use client";

import { useTransition } from "react";
import { createBlogPost } from "@/lib/actions/admin";
import { BLOG_CATEGORIES } from "@/types/database";
import type { BlogPost } from "@/types/database";
import { formatDate } from "@/lib/utils";

export function AdminBlogPageClient({ posts }: { posts: BlogPost[] }) {
  const [pending, startTransition] = useTransition();

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await createBlogPost(formData);
      (e.target as HTMLFormElement).reset();
    });
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Blog</h1>
      <p className="mt-1 text-sm text-gray-500">{posts.length} article(s)</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="font-serif text-lg text-forest">Nouvel article</h2>
          <form onSubmit={handleCreate} className="mt-4 space-y-3">
            <input name="title" placeholder="Titre" required className="input-field" />
            <input name="slug" placeholder="slug-article" required className="input-field" />
            <textarea name="excerpt" placeholder="Extrait" rows={2} required className="input-field resize-none" />
            <textarea name="content" placeholder="Contenu HTML" rows={4} required className="input-field resize-none" />
            <select name="category" className="input-field">
              {BLOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select name="status" className="input-field">
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
            <button type="submit" disabled={pending} className="btn-primary">
              {pending ? "Création..." : "Créer l'article"}
            </button>
          </form>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.category} · {post.status}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {post.published_at && formatDate(post.published_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
