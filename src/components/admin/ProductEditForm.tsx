"use client";

import { useTransition } from "react";
import { updateProduct } from "@/lib/actions/admin";
import type { Product } from "@/types/database";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ProductEditForm({ product }: { product: Product }) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("id", product.id);
    startTransition(async () => {
      await updateProduct(formData);
    });
  }

  return (
    <div>
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-forest">
        <ArrowLeft size={16} />
        Retour
      </Link>
      <h1 className="font-serif text-3xl text-forest">Modifier {product.name}</h1>

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label-field">Nom</label>
            <input name="name" defaultValue={product.name} className="input-field" />
          </div>
          <div>
            <label className="label-field">Slug</label>
            <input name="slug" defaultValue={product.slug} className="input-field" />
          </div>
          <div>
            <label className="label-field">Mission</label>
            <input name="mission" defaultValue={product.mission} className="input-field" />
          </div>
          <div>
            <label className="label-field">Prix (FCFA)</label>
            <input name="price" type="number" defaultValue={product.price ?? ""} className="input-field" />
          </div>
          <div>
            <label className="label-field">Stock</label>
            <input name="stock" type="number" defaultValue={product.stock} className="input-field" />
          </div>
          <div>
            <label className="label-field">Statut</label>
            <select name="status" defaultValue={product.status} className="input-field">
              <option value="draft">Brouillon</option>
              <option value="visible">Visible</option>
              <option value="preorder">Disponible (legacy)</option>
              <option value="out_of_stock">Rupture</option>
              <option value="coming_soon">Bientôt disponible</option>
            </select>
          </div>
          <div>
            <label className="label-field">Catégorie</label>
            <select name="category" defaultValue={product.category} className="input-field">
              <option value="bien-etre">Bien-être</option>
              <option value="grossesse">Grossesse</option>
              <option value="cycle-feminin">Cycle féminin</option>
              <option value="sport">Sport</option>
              <option value="sommeil">Sommeil</option>
            </select>
          </div>
          <div>
            <label className="label-field">Couleur thème</label>
            <select name="color_theme" defaultValue={product.color_theme} className="input-field">
              <option value="wellness">Wellness</option>
              <option value="bloom">Bloom</option>
              <option value="period">Period</option>
              <option value="pulse">Pulse</option>
              <option value="calm">Calm</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label-field">Description courte</label>
          <textarea name="short_description" rows={2} defaultValue={product.short_description} className="input-field resize-none" />
        </div>
        <div>
          <label className="label-field">Description longue</label>
          <textarea name="long_description" rows={4} defaultValue={product.long_description} className="input-field resize-none" />
        </div>
        <div>
          <label className="label-field">Pour qui</label>
          <input name="target_audience" defaultValue={product.target_audience} className="input-field" />
        </div>
        <div>
          <label className="label-field">Moment de consommation</label>
          <input name="usage_moment" defaultValue={product.usage_moment} className="input-field" />
        </div>
        <div>
          <label className="label-field">Préparation (séparé par virgules)</label>
          <input name="preparation_methods" defaultValue={product.preparation_methods.join(", ")} className="input-field" />
        </div>
        <div>
          <label className="label-field">Goûts (séparés par virgules)</label>
          <input name="dominant_flavors" defaultValue={product.dominant_flavors.join(", ")} className="input-field" />
        </div>
        <div>
          <label className="label-field">Ingrédients principaux (séparés par virgules)</label>
          <input name="main_ingredients" defaultValue={product.main_ingredients.join(", ")} className="input-field" />
        </div>

        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Enregistrement..." : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}
