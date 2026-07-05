import { HomeSections } from "@/components/public/HomeSections";
import {
  getProducts,
  getFAQs,
  getFeaturedTestimonialsForHome,
  getSiteSettings,
} from "@/lib/data/queries";
import { getAutoMarqueeImages } from "@/lib/data/discoverAssets";
import { getAllProductLifestyleMarquee } from "@/lib/data/productAssets";

export default async function HomePage() {
  const [products, faqs, testimonials, settings, marqueeImages] = await Promise.all([
    getProducts(),
    getFAQs(),
    getFeaturedTestimonialsForHome(),
    getSiteSettings(),
    Promise.resolve([...getAllProductLifestyleMarquee(), ...getAutoMarqueeImages()]),
  ]);

  return (
    <HomeSections
      products={products}
      faqs={faqs}
      testimonials={testimonials}
      settings={settings}
      marqueeImages={marqueeImages}
    />
  );
}
