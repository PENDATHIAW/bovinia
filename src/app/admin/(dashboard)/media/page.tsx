export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Médiathèque</h1>
      <p className="mt-1 text-sm text-gray-500">
        Upload et gestion des images via Supabase Storage (bucket &quot;media&quot;).
      </p>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8">
        <p className="text-sm text-gray-600">
          Dossiers disponibles : logos, produits, blog, packaging, réseaux sociaux.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Configurez Supabase Storage pour activer l&apos;upload. Les images peuvent aussi être
          placées dans <code className="rounded bg-gray-100 px-1">/public/assets/</code>.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {["logos", "produits", "blog", "packaging", "réseaux sociaux"].map((folder) => (
            <div key={folder} className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
              <p className="font-medium text-forest capitalize">{folder}</p>
              <p className="mt-1 text-xs text-gray-400">/assets/{folder}/</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
