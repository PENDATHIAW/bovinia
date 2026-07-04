"use client";

import { useTransition } from "react";
import { updatePreorderStatus } from "@/lib/actions/admin";
import { formatDate } from "@/lib/utils";
import type { Preorder } from "@/types/database";

const STATUSES = ["new", "contacted", "confirmed", "paid", "delivered", "cancelled"];

export function PreordersTable({ preorders }: { preorders: Preorder[] }) {
  const [pending, startTransition] = useTransition();

  function handleStatusChange(id: string, status: string) {
    startTransition(async () => {
      await updatePreorderStatus(id, status);
    });
  }

  if (preorders.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
        Aucune précommande pour le moment.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Nom</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Contact</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Produit</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Qté</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Ville</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Canal</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Statut</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          {preorders.map((p) => (
            <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">{formatDate(p.created_at)}</td>
              <td className="px-4 py-3 font-medium">{p.full_name}</td>
              <td className="px-4 py-3">
                <div>{p.phone}</div>
                <div className="text-xs text-gray-500">{p.email}</div>
              </td>
              <td className="px-4 py-3">{p.product_name}</td>
              <td className="px-4 py-3">{p.quantity}</td>
              <td className="px-4 py-3">{p.city}</td>
              <td className="px-4 py-3">{p.preferred_channel}</td>
              <td className="px-4 py-3">
                <select
                  value={p.status}
                  onChange={(e) => handleStatusChange(p.id, e.target.value)}
                  disabled={pending}
                  className="rounded border border-gray-200 px-2 py-1 text-xs"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3">
                <a
                  href={`https://wa.me/${p.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour ${p.full_name}, concernant votre précommande BOVINIA ${p.product_name}...`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline text-xs"
                >
                  Contacter
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
