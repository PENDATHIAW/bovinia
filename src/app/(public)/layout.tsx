import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { DemoBanner } from "@/components/public/DemoBanner";
import { TrustBar } from "@/components/public/TrustBar";
import { PublicProviders } from "@/components/public/PublicProviders";
import { WhatsAppFab } from "@/components/public/WhatsAppFab";
import { getSiteSettings } from "@/lib/data/queries";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <PublicProviders>
      <DemoBanner />
      <Header />
      <TrustBar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab whatsappNumber={settings.whatsapp_number} />
    </PublicProviders>
  );
}
