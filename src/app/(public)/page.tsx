import { HomeSections } from "@/components/public/HomeSections";
import {
  getProducts,
  getFAQs,
  getFeaturedTestimonialsForHome,
  getSiteSettings,
} from "@/lib/data/queries";

export default async function HomePage() {
  const [products, faqs, testimonials, settings] = await Promise.all([
    getProducts(),
    getFAQs(),
    getFeaturedTestimonialsForHome(),
    getSiteSettings(),
  ]);

  return (
    <HomeSections products={products} faqs={faqs} testimonials={testimonials} settings={settings} />
  );
}
