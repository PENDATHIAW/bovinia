import type { Metadata } from "next";
import { BoneBrothEducation } from "@/components/public/BoneBrothEducation";
import { PageHero } from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "Le Bone Broth — bouillon d'os premium",
  description:
    "Qu'est-ce que le Bone Broth ? Bienfaits, engouement TikTok, fruits et plantes africains — BOVINIA, pionnière au Sénégal.",
};

export default function BoneBrothPage() {
  return (
    <>
      <PageHero
        label="Notre base"
        title="Le Bone Broth, expliqué simplement"
        description="Au Sénégal, peu connaissent encore le bouillon d'os sous forme premium. BOVINIA le rend accessible, gourmand et local."
      />
      <div className="section-padding pt-10">
        <div className="container-bovinia">
          <BoneBrothEducation />
        </div>
      </div>
    </>
  );
}
