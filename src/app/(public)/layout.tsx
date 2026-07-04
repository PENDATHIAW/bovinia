import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { DemoBanner } from "@/components/public/DemoBanner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
