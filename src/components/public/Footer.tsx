import Link from "next/link";
import { MessageCircle, Share2 } from "lucide-react";
import { Logo } from "./Logo";
import { getSiteSettings } from "@/lib/data/queries";

const FOOTER_LINKS = [
  { href: "/produits", label: "Nos rituels" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/horizon-farm", label: "Horizon Farm" },
  { href: "/blog", label: "Conseils" },
  { href: "/precommande", label: "Précommander" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Confidentialité" },
];

export async function Footer() {
  const settings = await getSiteSettings();
  const whatsappUrl = `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}`;

  return (
    <footer className="border-t border-gold/20 bg-forest text-ivory">
      <div className="container-bovinia section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 brightness-0 invert">
              <Logo size="md" />
            </div>
            <p className="text-sm text-ivory/70 leading-relaxed">
              {settings.footer_tagline}
            </p>
            <p className="mt-2 text-xs tracking-widest text-gold uppercase">
              Powered by Bone Broth
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg text-gold">Navigation</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg text-gold">Contact</h3>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li>{settings.contact_address}</li>
              <li>
                <a href={`mailto:${settings.contact_email}`} className="hover:text-gold transition-colors">
                  {settings.contact_email}
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg text-gold">Réseaux</h3>
            <div className="flex gap-4">
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/30 p-2 text-gold transition-colors hover:bg-gold/10" aria-label="Instagram">
                  <Share2 size={20} />
                </a>
              )}
              {settings.tiktok_url && (
                <a href={settings.tiktok_url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/30 px-3 py-2 text-xs text-gold transition-colors hover:bg-gold/10" aria-label="TikTok">
                  TikTok
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-ivory/10 pt-8 text-center text-xs text-ivory/50">
          <p>© {new Date().getFullYear()} BOVINIA. Tous droits réservés. Fabriqué au Sénégal.</p>
          <p className="mt-1">
            Les produits BOVINIA sont des aliments fonctionnels et ne remplacent pas un avis médical.
          </p>
        </div>
      </div>
    </footer>
  );
}
