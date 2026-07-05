"use client";

import { SectionAnchorNav } from "./SectionAnchorNav";

const PRODUCT_ANCHORS = [
  { id: "produit", label: "Le produit" },
  { id: "images", label: "En images" },
  { id: "mode-emploi", label: "Mode d'emploi" },
  { id: "avis", label: "Avis" },
  { id: "routine", label: "Routine" },
];

export function ProductPageNav() {
  return <SectionAnchorNav links={PRODUCT_ANCHORS} />;
}
