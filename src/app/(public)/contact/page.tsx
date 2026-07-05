import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Mail, MapPin, ShoppingBag, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";
import { getSiteSettings } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe BOVINIA pour toute question sur nos rituels nutritionnels.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappUrl = `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}`;

  return (
    <div className="section-padding">
      <div className="container-bovinia">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-label">Contact</p>
          <h1 className="section-title">Parlons ensemble</h1>
          <p className="mt-4 text-foreground/70">
            Une question sur nos rituels, un partenariat ou une demande d&apos;export ?
            Pour commander, passez directement par la boutique en ligne.
          </p>
          <Link href="/commander" className="btn-gold mt-6 inline-flex">
            <ShoppingBag size={16} />
            Passer commande
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="card-premium p-6">
              <Mail className="text-gold" size={24} />
              <h2 className="mt-3 font-serif text-lg text-forest">Email</h2>
              <a
                href={`mailto:${settings.contact_email}`}
                className="mt-2 block text-sm text-forest/70 hover:text-forest"
              >
                {settings.contact_email}
              </a>
            </div>
            <div className="card-premium p-6">
              <MessageCircle className="text-gold" size={24} />
              <h2 className="mt-3 font-serif text-lg text-forest">WhatsApp</h2>
              <p className="mt-1 text-xs text-foreground/50">Questions uniquement — pas pour commander</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm text-forest/70 hover:text-forest"
              >
                {settings.whatsapp_number}
              </a>
            </div>
            <div className="card-premium p-6">
              <MapPin className="text-gold" size={24} />
              <h2 className="mt-3 font-serif text-lg text-forest">Localisation</h2>
              <p className="mt-2 text-sm text-foreground/70">{settings.contact_address}</p>
            </div>
          </div>

          <div className="lg:col-span-2 card-premium p-6 md:p-8">
            <h2 className="font-serif text-xl text-forest">Envoyer un message</h2>
            <p className="mt-2 text-sm text-foreground/60">
              Nous répondons sous 24 à 48 h ouvrées.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
