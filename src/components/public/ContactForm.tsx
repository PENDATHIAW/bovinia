"use client";

import { useState, useTransition } from "react";
import { submitContact } from "@/lib/actions/forms";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitContact(formData);
      if (result.success) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError(result.error ?? "Une erreur est survenue.");
      }
    });
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-forest/20 bg-forest/5 p-8 text-center">
        <p className="font-serif text-xl text-forest">Message envoyé !</p>
        <p className="mt-2 text-sm text-foreground/70">
          Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="full_name" className="label-field">Nom *</label>
          <input id="full_name" name="full_name" required className="input-field" />
        </div>
        <div>
          <label htmlFor="email" className="label-field">Email *</label>
          <input id="email" name="email" type="email" required className="input-field" />
        </div>
        <div>
          <label htmlFor="phone" className="label-field">Téléphone</label>
          <input id="phone" name="phone" type="tel" className="input-field" />
        </div>
        <div>
          <label htmlFor="subject" className="label-field">Sujet *</label>
          <input id="subject" name="subject" required className="input-field" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label-field">Message *</label>
        <textarea id="message" name="message" rows={5} required className="input-field resize-none" />
      </div>

      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Envoi..." : "Envoyer le message"}
      </button>
    </form>
  );
}
