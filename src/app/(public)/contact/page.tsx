import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin } from "lucide-react";
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
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Contact</p>
          <h1 className="mt-2 font-serif text-4xl text-forest">Parlons ensemble</h1>
          <p className="mt-4 text-foreground/70">
            Une question sur nos produits, une demande de partenariat ou d&apos;export ?
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="card-premium p-6">
              <MessageCircle className="text-gold" size={24} />
              <h2 className="mt-3 font-serif text-lg text-forest">WhatsApp</h2>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-forest/70 hover:text-forest">
                {settings.whatsapp_number}
              </a>
            </div>
            <div className="card-premium p-6">
              <Mail className="text-gold" size={24} />
              <h2 className="mt-3 font-serif text-lg text-forest">Email</h2>
              <a href={`mailto:${settings.contact_email}`} className="mt-2 block text-sm text-forest/70 hover:text-forest">
                {settings.contact_email}
              </a>
            </div>
            <div className="card-premium p-6">
              <MapPin className="text-gold" size={24} />
              <h2 className="mt-3 font-serif text-lg text-forest">Localisation</h2>
              <p className="mt-2 text-sm text-foreground/70">{settings.contact_address}</p>
            </div>
          </div>

          <div className="lg:col-span-2 card-premium p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
