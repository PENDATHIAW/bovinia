import { getSiteSettings } from "@/lib/data/queries";
import { AdminSettingsForm } from "@/components/admin/AdminSettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Paramètres du site</h1>
      <p className="mt-1 text-sm text-gray-500">Contenus, contact et SEO</p>
      <div className="mt-6">
        <AdminSettingsForm settings={settings} />
      </div>
    </div>
  );
}
