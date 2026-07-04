import { getAdminTestimonials } from "@/lib/data/admin-queries";
import { AdminTestimonialsPageClient } from "@/components/admin/AdminTestimonialsPageClient";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminTestimonials();
  return <AdminTestimonialsPageClient testimonials={testimonials} />;
}
