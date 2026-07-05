import type { Product } from "@/types/database";
import { DISCOVERY_PACKS } from "@/components/public/DiscoveryPacks";

export const SHIPPING_FEE = 2000;
export const FREE_SHIPPING_MIN = 50000;

export const PAYMENT_METHODS = [
  { id: "wave", label: "Wave" },
  { id: "orange_money", label: "Orange Money" },
  { id: "cash_on_delivery", label: "Paiement à la livraison" },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];

export const PAYMENT_INSTRUCTIONS: Record<
  PaymentMethodId,
  { summary: string; steps: string[] }
> = {
  wave: {
    summary: "Vous recevrez un lien Wave par SMS ou WhatsApp sous 24 h.",
    steps: [
      "Confirmez votre commande sur le site.",
      "Notre équipe vous envoie un lien de paiement Wave.",
      "Réglez le montant exact indiqué sur le récapitulatif.",
      "Votre commande est préparée dès réception du paiement.",
    ],
  },
  orange_money: {
    summary: "Vous recevrez les coordonnées Orange Money par SMS ou WhatsApp sous 24 h.",
    steps: [
      "Confirmez votre commande sur le site.",
      "Nous vous communiquons le numéro et le montant à régler.",
      "Effectuez le transfert Orange Money.",
      "Votre commande est préparée dès réception du paiement.",
    ],
  },
  cash_on_delivery: {
    summary: "Vous réglez en espèces au livreur à la réception.",
    steps: [
      "Confirmez votre commande — aucun paiement immédiat.",
      "Nous préparons et expédions votre colis.",
      "Le livreur vous contacte pour la livraison.",
      "Réglez le montant total en espèces à la réception.",
    ],
  },
};

export interface CartLine {
  key: string;
  type: "product" | "pack";
  name: string;
  slug?: string;
  packId?: string;
  productId?: string;
  quantity: number;
  unitPrice: number;
}

export function getPaymentLabel(id: string): string {
  return PAYMENT_METHODS.find((m) => m.id === id)?.label ?? id;
}

export function computeCartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_MIN || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;
  return { subtotal, shippingFee, total };
}

export function buildInitialCart(
  products: Product[],
  defaultProduct?: string,
  defaultPack?: string
): CartLine[] {
  if (defaultPack) {
    const pack = DISCOVERY_PACKS.find((p) => p.id === defaultPack);
    if (pack) {
      return [
        {
          key: `pack-${pack.id}`,
          type: "pack",
          name: `Pack ${pack.name}`,
          packId: pack.id,
          quantity: 1,
          unitPrice: pack.price,
        },
      ];
    }
  }

  if (defaultProduct) {
    const product = products.find((p) => p.slug === defaultProduct);
    if (product?.price) {
      return [
        {
          key: `product-${product.slug}`,
          type: "product",
          name: product.name,
          slug: product.slug,
          productId: product.id,
          quantity: 1,
          unitPrice: product.price,
        },
      ];
    }
  }

  return [];
}

export function cartLinesToPayload(lines: CartLine[]) {
  return lines.map((line) => ({
    productId: line.productId ?? null,
    slug: line.slug ?? line.packId ?? null,
    name: line.name,
    quantity: line.quantity,
    unitPrice: line.unitPrice,
  }));
}

export function addProductToCart(cart: CartLine[], product: Product): CartLine[] {
  if (!product.price) return cart;
  const key = `product-${product.slug}`;
  const existing = cart.find((l) => l.key === key);
  if (existing) {
    return cart.map((l) =>
      l.key === key ? { ...l, quantity: Math.min(l.quantity + 1, 20) } : l
    );
  }
  return [
    ...cart,
    {
      key,
      type: "product",
      name: product.name,
      slug: product.slug,
      productId: product.id,
      quantity: 1,
      unitPrice: product.price,
    },
  ];
}

export function addPackToCart(cart: CartLine[], packId: string): CartLine[] {
  const pack = DISCOVERY_PACKS.find((p) => p.id === packId);
  if (!pack) return cart;
  const key = `pack-${pack.id}`;
  const existing = cart.find((l) => l.key === key);
  if (existing) {
    return cart.map((l) =>
      l.key === key ? { ...l, quantity: Math.min(l.quantity + 1, 5) } : l
    );
  }
  return [
    ...cart,
    {
      key,
      type: "pack",
      name: `Pack ${pack.name}`,
      packId: pack.id,
      quantity: 1,
      unitPrice: pack.price,
    },
  ];
}

export function updateLineQuantity(cart: CartLine[], key: string, quantity: number): CartLine[] {
  if (quantity <= 0) return cart.filter((l) => l.key !== key);
  const max = cart.find((l) => l.key === key)?.type === "pack" ? 5 : 20;
  return cart.map((l) => (l.key === key ? { ...l, quantity: Math.min(quantity, max) } : l));
}

export function removeLine(cart: CartLine[], key: string): CartLine[] {
  return cart.filter((l) => l.key !== key);
}
