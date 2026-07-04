"use client";

import { useState, useTransition } from "react";
import { loginAdmin } from "@/lib/actions/admin";
import { Logo } from "@/components/public/Logo";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await loginAdmin(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>
        <div className="rounded-2xl border border-gold/20 bg-white p-8 shadow-sm">
          <h1 className="font-serif text-2xl text-forest">Connexion admin</h1>
          <p className="mt-1 text-sm text-foreground/60">
            Accédez au CMS BOVINIA
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="label-field">Email</label>
              <input id="email" name="email" type="email" required className="input-field" />
            </div>
            <div>
              <label htmlFor="password" className="label-field">Mot de passe</label>
              <input id="password" name="password" type="password" required className="input-field" />
            </div>
            <button type="submit" disabled={pending} className="btn-primary w-full">
              {pending ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
