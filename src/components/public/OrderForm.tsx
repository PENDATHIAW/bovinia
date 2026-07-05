"use client";

import { useState, useTransition } from "react";
import { submitOrder } from "@/lib/actions/forms";
import { DISCOVERY_PACKS } from "@/components/public/DiscoveryPacks";
import type { Product } from "@/types/database";

interface OrderFormProps {
  products: Product[];
  defaultProduct?: string;
  defaultPack?: string;
  compact?: boolean;
}

function getDefaultProductName(
  products: Product[],
  defaultProduct?: string,
  defaultPack?: string
): string {
  if (defaultPack) {
    const pack = DISCOVERY_PACKS.find((p) => p.id === defaultPack);
    if (pack) return `Pack ${pack.name}`;
  }
  if (defaultProduct) {
    return products.find((p) => p.slug === defaultProduct)?.name ?? "";
  }
  return "";
}

function getDefaultQuantity(defaultPack?: string): number {
  if (!defaultPack) return 1;
  const pack = DISCOVERY_PACKS.find((p) => p.id === defaultPack);
  return pack?.slugs.length ?? 1;
}

export function OrderForm({
  products,
  defaultProduct,
  defaultPack,
  compact = false,
}: OrderFormProps) {
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultProductName = getDefaultProductName(products, defaultProduct, defaultPack);
  const defaultQuantity = getDefaultQuantity(defaultPack);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitOrder(formData);
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
        <p className="font-serif text-xl text-forest">Commande enregistrée !</p>
        <p className="mt-2 text-sm text-foreground/70">
          Nous vous contactons très rapidement par WhatsApp ou téléphone pour confirmer votre
          commande et organiser la livraison.
        </p>
        <button
          type="button"
          className="btn-secondary mt-4"
          onClick={() => setSuccess(false)}
        >
          Passer une autre commande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-4 md:grid-cols-2"}>
        <div>
          <label htmlFor="full_name" className="label-field">
            Nom complet *
          </label>
          <input id="full_name" name="full_name" required className="input-field" />
        </div>
        <div>
          <label htmlFor="phone" className="label-field">
            Téléphone *
          </label>
          <input id="phone" name="phone" type="tel" required className="input-field" />
        </div>
        <div>
          <label htmlFor="email" className="label-field">
            Email *
          </label>
          <input id="email" name="email" type="email" required className="input-field" />
        </div>
        <div>
          <label htmlFor="city" className="label-field">
            Ville *
          </label>
          <input id="city" name="city" required className="input-field" />
        </div>
        <div>
          <label htmlFor="product_name" className="label-field">
            Produit ou pack *
          </label>
          <select
            id="product_name"
            name="product_name"
            required
            defaultValue={defaultProductName}
            className="input-field"
          >
            <option value="">Sélectionner</option>
            <optgroup label="Rituels disponibles">
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} — {p.mission}
                </option>
              ))}
            </optgroup>
            <optgroup label="Packs">
              {DISCOVERY_PACKS.map((pack) => (
                <option key={pack.id} value={`Pack ${pack.name}`}>
                  Pack {pack.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="label-field">
            Quantité
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            max={20}
            defaultValue={defaultQuantity}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="preferred_channel" className="label-field">
            Comment vous joindre ?
          </label>
          <select id="preferred_channel" name="preferred_channel" className="input-field">
            <option value="whatsapp">WhatsApp</option>
            <option value="call">Appel téléphonique</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="message" className="label-field">
            Adresse ou précisions (optionnel)
          </label>
          <textarea id="message" name="message" rows={3} className="input-field resize-none" />
        </div>
      )}

      <div className="flex items-start gap-2">
        <input
          id="marketing_consent"
          name="marketing_consent"
          type="checkbox"
          value="true"
          className="mt-1"
        />
        <label htmlFor="marketing_consent" className="text-xs text-foreground/60">
          J&apos;accepte de recevoir des actualités BOVINIA (offres, conseils nutrition).
        </label>
      </div>

      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <button type="submit" disabled={pending} className="btn-gold w-full sm:w-auto">
        {pending ? "Envoi en cours..." : "Confirmer ma commande"}
      </button>
    </form>
  );
}
