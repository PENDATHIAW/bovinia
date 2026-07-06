/** Rituels à destination principalement féminine — formulation au féminin */
const WOMEN_RITUALS = new Set(["bloom", "period"]);

export function getProductTestimonialCopy(productSlug: string, productName: string) {
  const feminine = WOMEN_RITUALS.has(productSlug);

  return {
    title: feminine ? "Ce qu'en disent nos clientes" : "Ce qu'en disent nos clientes et clients",
    description: feminine
      ? `Retours de femmes sur ${productName} — routines, goûts et moments de consommation.`
      : `Retours sur ${productName} — routines réelles, goûts et moments de consommation.`,
  };
}
