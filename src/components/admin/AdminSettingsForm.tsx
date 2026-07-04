"use client";

import { useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/admin";
import type { SiteSettings } from "@/types/database";

export function AdminSettingsForm({ settings }: { settings: SiteSettings }) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateSiteSettings(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="font-serif text-lg text-forest">Hero</h2>
      <div>
        <label className="label-field">Titre hero</label>
        <input name="hero_title" defaultValue={settings.hero_title} className="input-field" />
      </div>
      <div>
        <label className="label-field">Sous-titre hero</label>
        <textarea name="hero_subtitle" rows={2} defaultValue={settings.hero_subtitle} className="input-field resize-none" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label-field">CTA principal</label>
          <input name="hero_cta_primary" defaultValue={settings.hero_cta_primary} className="input-field" />
        </div>
        <div>
          <label className="label-field">CTA secondaire</label>
          <input name="hero_cta_secondary" defaultValue={settings.hero_cta_secondary} className="input-field" />
        </div>
      </div>

      <h2 className="pt-4 font-serif text-lg text-forest">Contact & réseaux</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label-field">WhatsApp</label>
          <input name="whatsapp_number" defaultValue={settings.whatsapp_number} className="input-field" />
        </div>
        <div>
          <label className="label-field">Email</label>
          <input name="contact_email" defaultValue={settings.contact_email} className="input-field" />
        </div>
        <div>
          <label className="label-field">Adresse</label>
          <input name="contact_address" defaultValue={settings.contact_address} className="input-field" />
        </div>
        <div>
          <label className="label-field">Instagram</label>
          <input name="instagram_url" defaultValue={settings.instagram_url} className="input-field" />
        </div>
        <div>
          <label className="label-field">TikTok</label>
          <input name="tiktok_url" defaultValue={settings.tiktok_url} className="input-field" />
        </div>
      </div>

      <h2 className="pt-4 font-serif text-lg text-forest">SEO & Footer</h2>
      <div>
        <label className="label-field">Titre du site</label>
        <input name="site_title" defaultValue={settings.site_title} className="input-field" />
      </div>
      <div>
        <label className="label-field">Description</label>
        <textarea name="site_description" rows={2} defaultValue={settings.site_description} className="input-field resize-none" />
      </div>
      <div>
        <label className="label-field">Tagline footer</label>
        <input name="footer_tagline" defaultValue={settings.footer_tagline} className="input-field" />
      </div>

      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Enregistrement..." : "Enregistrer les paramètres"}
      </button>
    </form>
  );
}
