import { HomeSections } from "@/components/public/HomeSections";
import {
  getProducts,
  getFAQs,
  getTestimonials,
  getSiteSettings,
} from "@/lib/data/queries";

export default async function HomePage() {
  const [products, faqs, testimonials, settings] = await Promise.all([
    getProducts(),
    getFAQs(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  return <HomeSections products={products} faqs={faqs} testimonials={testimonials} settings={settings} />;
}
