"use client";

import { useTransition } from "react";
import { createFAQ } from "@/lib/actions/admin";
import type { FAQ } from "@/types/database";

export function AdminFAQPageClient({ faqs }: { faqs: FAQ[] }) {
  const [pending, startTransition] = useTransition();

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("is_active", "true");
    startTransition(async () => {
      await createFAQ(formData);
      (e.target as HTMLFormElement).reset();
    });
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">FAQ</h1>
      <p className="mt-1 text-sm text-gray-500">{faqs.length} question(s)</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleCreate} className="rounded-xl border border-gray-200 bg-white p-6 space-y-3">
          <h2 className="font-serif text-lg text-forest">Ajouter une FAQ</h2>
          <input name="question" placeholder="Question" required className="input-field" />
          <textarea name="answer" placeholder="Réponse" rows={3} required className="input-field resize-none" />
          <input name="sort_order" type="number" placeholder="Ordre" defaultValue={faqs.length + 1} className="input-field" />
          <button type="submit" disabled={pending} className="btn-primary">
            {pending ? "Ajout..." : "Ajouter"}
          </button>
        </form>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="font-medium text-forest">{faq.question}</p>
              <p className="mt-1 text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
