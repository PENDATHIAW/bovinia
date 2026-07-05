"use client";

import { useState, useTransition } from "react";
import { submitNewsletter } from "@/lib/actions/forms";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const formData = new FormData();
    formData.set("email", email);
    formData.set("marketing_consent", "true");

    startTransition(async () => {
      const result = await submitNewsletter(formData);
      if (result.success) {
        setMessage("Merci ! Vous êtes inscrit(e) à notre newsletter.");
        setEmail("");
      } else {
        setError(result.error ?? "Inscription impossible.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-ivory/70">
        Recevez nos conseils nutrition et offres exclusives.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-full border border-gold/30 bg-forest px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {pending ? "..." : "S'inscrire"}
        </button>
      </div>
      {message && <p className="text-xs text-gold">{message}</p>}
      {error && <p className="text-xs text-gold-light">{error}</p>}
    </form>
  );
}
