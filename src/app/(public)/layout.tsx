import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { DemoBanner } from "@/components/public/DemoBanner";
import { TrustBar } from "@/components/public/TrustBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoBanner />
      <Header />
      <TrustBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
