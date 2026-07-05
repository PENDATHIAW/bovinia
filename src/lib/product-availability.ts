import type { ProductStatus } from "@/types/database";

const STATUS_LABELS: Record<ProductStatus, string> = {
  visible: "Disponible",
  preorder: "Disponible",
  coming_soon: "Bientôt disponible",
  out_of_stock: "Rupture de stock",
  draft: "Indisponible",
};

export function getProductAvailabilityLabel(status: ProductStatus): string {
  return STATUS_LABELS[status] ?? "Disponible";
}

export function isProductOrderable(status: ProductStatus): boolean {
  return status === "visible" || status === "preorder";
}
