import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { getSiteSettings } from "@/lib/data/queries";

const FOOTER_LINKS = [
  { href: "/produits", label: "Boutique" },
  { href: "/comparateur", label: "Comparer les rituels" },
  { href: "/preparation", label: "Comment préparer" },
  { href: "/quel-rituel", label: "Quel rituel ?" },
  { href: "/commander", label: "Commander" },
  { href: "/livraison", label: "Livraison" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/horizon-farm", label: "Horizon Farm" },
  { href: "/blog", label: "Conseils" },
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
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo size="md" onDark className="mb-4" />
            <p className="text-sm leading-relaxed text-ivory/70">{settings.footer_tagline}</p>
            <div className="mt-6">
              <h3 className="mb-3 font-serif text-lg text-gold">Newsletter</h3>
              <NewsletterForm />
            </div>
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
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="transition-colors hover:text-gold"
                >
                  {settings.contact_email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg text-gold">Réseaux</h3>
            <div className="flex flex-wrap gap-3">
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gold/30 px-4 py-2 text-xs text-gold transition-colors hover:bg-gold/10"
                >
                  Instagram
                </a>
              )}
              {settings.tiktok_url && (
                <a
                  href={settings.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gold/30 px-4 py-2 text-xs text-gold transition-colors hover:bg-gold/10"
                >
                  TikTok
                </a>
              )}
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gold/30 px-4 py-2 text-xs text-gold transition-colors hover:bg-gold/10"
                >
                  Facebook
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
