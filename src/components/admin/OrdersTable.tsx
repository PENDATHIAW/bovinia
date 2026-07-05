"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions/admin";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Order, OrderItemRow } from "@/types/database";

const PAYMENT_STATUSES = ["pending", "paid", "failed", "refunded"];
const DELIVERY_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export function OrdersTable({
  orders,
  itemsByOrder,
}: {
  orders: Order[];
  itemsByOrder: Record<string, OrderItemRow[]>;
}) {
  const [pending, startTransition] = useTransition();

  function handlePaymentChange(id: string, status: string) {
    startTransition(async () => {
      await updateOrderStatus(id, { payment_status: status });
    });
  }

  function handleDeliveryChange(id: string, status: string) {
    startTransition(async () => {
      await updateOrderStatus(id, { delivery_status: status });
    });
  }

  if (orders.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
        Aucune commande pour le moment.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">N° commande</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Client</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Articles</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Total</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Paiement</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Livraison</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const items = itemsByOrder[order.id] ?? [];
            return (
              <tr key={order.id} className="border-b border-gray-100 align-top hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(order.created_at)}</td>
                <td className="px-4 py-3 font-mono text-xs">{order.order_number ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{order.customer_name}</div>
                  <div className="text-xs text-gray-500">{order.customer_phone}</div>
                  <div className="text-xs text-gray-500">{order.customer_email}</div>
                  <div className="text-xs text-gray-500">{order.city}</div>
                </td>
                <td className="px-4 py-3">
                  <ul className="space-y-0.5 text-xs">
                    {items.map((item) => (
                      <li key={item.id}>
                        {item.product_name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  {formatPrice(Number(order.total))}
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs text-gray-500 mb-1">{order.payment_method}</div>
                  <select
                    value={order.payment_status}
                    onChange={(e) => handlePaymentChange(order.id, e.target.value)}
                    disabled={pending}
                    className="rounded border border-gray-200 px-2 py-1 text-xs"
                  >
                    {PAYMENT_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.delivery_status}
                    onChange={(e) => handleDeliveryChange(order.id, e.target.value)}
                    disabled={pending}
                    className="rounded border border-gray-200 px-2 py-1 text-xs"
                  >
                    {DELIVERY_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
