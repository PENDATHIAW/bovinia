import { getAdminFAQs } from "@/lib/data/admin-queries";
import { AdminFAQPageClient } from "@/components/admin/AdminFAQPageClient";

export default async function AdminFAQPage() {
  const faqs = await getAdminFAQs();
  return <AdminFAQPageClient faqs={faqs} />;
}
