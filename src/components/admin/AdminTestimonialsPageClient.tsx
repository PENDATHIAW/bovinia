"use client";

import { useTransition } from "react";
import { createTestimonial } from "@/lib/actions/admin";
import type { Testimonial } from "@/types/database";

export function AdminTestimonialsPageClient({ testimonials }: { testimonials: Testimonial[] }) {
  const [pending, startTransition] = useTransition();

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("is_visible", "true");
    startTransition(async () => {
      await createTestimonial(formData);
      (e.target as HTMLFormElement).reset();
    });
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Témoignages</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleCreate} className="rounded-xl border border-gray-200 bg-white p-6 space-y-3">
          <h2 className="font-serif text-lg text-forest">Ajouter un témoignage</h2>
          <input name="name" placeholder="Nom" required className="input-field" />
          <input name="city" placeholder="Ville" required className="input-field" />
          <input name="product_name" placeholder="Produit (optionnel)" className="input-field" />
          <input name="rating" type="number" min={1} max={5} defaultValue={5} className="input-field" />
          <textarea name="text" placeholder="Témoignage" rows={3} required className="input-field resize-none" />
          <button type="submit" disabled={pending} className="btn-primary">
            {pending ? "Ajout..." : "Ajouter"}
          </button>
        </form>

        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="font-medium">{t.name} — {t.city}</p>
              <p className="mt-1 text-sm text-gray-600">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-1 text-xs text-gray-400">{t.rating}/5 · {t.is_visible ? "Visible" : "Masqué"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
