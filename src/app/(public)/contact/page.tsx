import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Mail, MapPin, ShoppingBag, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";
import { PageHero } from "@/components/public/PageHero";
import { getSiteSettings } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe BOVINIA pour toute question sur nos rituels nutritionnels.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappNumber = settings.whatsapp_number.replaceAll(" ", "").replaceAll("+", "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <>
      <PageHero
        label="Contact"
        title="Parlons ensemble"
        description="Une question sur nos rituels, un partenariat ou une demande d'export ? Pour commander, passez par la boutique en ligne."
      >
        <Link href="/commander" className="btn-gold">
          <ShoppingBag size={16} />
          Passer commande
          <ArrowRight size={16} />
        </Link>
      </PageHero>

      <div className="section-padding">
        <div className="container-bovinia">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-5">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: (
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="text-sm text-forest/70 transition-colors hover:text-gold"
                    >
                      {settings.contact_email}
                    </a>
                  ),
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp",
                  content: (
                    <>
                      <p className="text-xs text-foreground/50">Questions uniquement</p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-sm text-forest/70 transition-colors hover:text-gold"
                      >
                        {settings.whatsapp_number}
                      </a>
                    </>
                  ),
                },
                {
                  icon: MapPin,
                  title: "Localisation",
                  content: (
                    <p className="text-sm text-foreground/70">{settings.contact_address}</p>
                  ),
                },
              ].map(({ icon: Icon, title, content }) => (
                <div key={title} className="card-premium card-lift p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-cream">
                    <Icon className="text-gold" size={20} />
                  </div>
                  <h2 className="mt-4 font-serif text-lg text-forest">{title}</h2>
                  <div className="mt-2">{content}</div>
                </div>
              ))}
            </div>

            <div className="card-premium border-l-4 border-l-gold/50 p-6 md:p-10 lg:col-span-2">
              <h2 className="font-serif text-2xl text-forest">Envoyer un message</h2>
              <p className="mt-2 text-sm text-foreground/60">
                Nous répondons sous 24 à 48 h ouvrées.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
