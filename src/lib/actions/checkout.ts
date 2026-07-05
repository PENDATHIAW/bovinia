"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { getProducts } from "@/lib/data/queries";
import {
  cartLinesToPayload,
  computeCartTotals,
  getPaymentLabel,
  type CartLine,
} from "@/lib/shop/cart";
import { DISCOVERY_PACKS } from "@/components/public/DiscoveryPacks";

const customerSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Téléphone requis"),
  city: z.string().min(2, "Ville requise"),
  address: z.string().min(5, "Adresse requise"),
});

const checkoutSchema = z.object({
  customer: customerSchema,
  lines: z
    .array(
      z.object({
        key: z.string(),
        type: z.enum(["product", "pack"]),
        name: z.string(),
        slug: z.string().optional(),
        packId: z.string().optional(),
        productId: z.string().optional(),
        quantity: z.number().int().min(1).max(20),
        unitPrice: z.number().min(0),
      })
    )
    .min(1, "Panier vide"),
  paymentMethod: z.enum(["wave", "orange_money", "cash_on_delivery"]),
  note: z.string().optional(),
  website: z.string().max(0).optional(),
});

export type CheckoutResult =
  | {
      success: true;
      orderNumber: string;
      orderId: string;
      subtotal: number;
      shippingFee: number;
      total: number;
      emailSent: boolean;
    }
  | { success: false; error: string };

async function validateCartPrices(lines: CartLine[]): Promise<CartLine[] | null> {
  const products = await getProducts();
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
  const byId = Object.fromEntries(products.map((p) => [p.id, p]));

  const validated: CartLine[] = [];

  for (const line of lines) {
    if (line.type === "pack" && line.packId) {
      const pack = DISCOVERY_PACKS.find((p) => p.id === line.packId);
      if (!pack || pack.price !== line.unitPrice) return null;
      validated.push(line);
      continue;
    }
    if (line.type === "product") {
      const product = line.slug
        ? bySlug[line.slug]
        : line.productId
          ? byId[line.productId]
          : undefined;
      if (!product?.price || product.price !== line.unitPrice) return null;
      validated.push({
        ...line,
        productId: product.id,
        slug: product.slug,
        name: product.name,
      });
      continue;
    }
    return null;
  }

  return validated;
}

function generateDemoOrderNumber() {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `BOV-${today}-${rand}`;
}

export async function submitCheckout(input: {
  customer: z.infer<typeof customerSchema>;
  lines: CartLine[];
  paymentMethod: string;
  note?: string;
  website?: string;
}): Promise<CheckoutResult> {
  if (input.website) {
    return { success: false, error: "Requête invalide." };
  }

  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Données invalides." };
  }

  const validatedLines = await validateCartPrices(parsed.data.lines);
  if (!validatedLines) {
    return { success: false, error: "Panier invalide — veuillez rafraîchir la page." };
  }

  const { subtotal, shippingFee, total } = computeCartTotals(validatedLines);
  const paymentLabel = getPaymentLabel(parsed.data.paymentMethod);
  const itemsPayload = cartLinesToPayload(validatedLines);

  const supabase = await createServiceClient();

  if (!supabase) {
    const orderNumber = generateDemoOrderNumber();
    console.log("[Checkout demo]", {
      orderNumber,
      customer: parsed.data.customer,
      items: itemsPayload,
      total,
      paymentMethod: paymentLabel,
    });
    return {
      success: true,
      orderNumber,
      orderId: "demo",
      subtotal,
      shippingFee,
      total,
      emailSent: false,
    };
  }

  const { data, error } = await supabase.rpc("place_order", {
    p_customer: parsed.data.customer,
    p_items: itemsPayload,
    p_payment_method: paymentLabel,
    p_subtotal: subtotal,
    p_shipping_fee: shippingFee,
    p_total: total,
    p_note: parsed.data.note ?? null,
  });

  if (error) {
    console.error("place_order error:", error);

    if (error.message.includes("place_order") || error.code === "PGRST202") {
      const orderNumber = generateDemoOrderNumber();
      const { data: order, error: insertError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          customer_name: parsed.data.customer.name,
          customer_email: parsed.data.customer.email,
          customer_phone: parsed.data.customer.phone,
          city: parsed.data.customer.city,
          address: parsed.data.customer.address,
          subtotal,
          shipping_fee: shippingFee,
          total,
          payment_method: paymentLabel,
          payment_status: "pending",
          delivery_status: "pending",
          note: parsed.data.note ?? null,
          items: itemsPayload,
        })
        .select("id")
        .single();

      if (insertError || !order) {
        return { success: false, error: "Impossible d'enregistrer votre commande. Réessayez." };
      }

      await supabase.from("order_items").insert(
        itemsPayload.map((item) => ({
          order_id: order.id,
          product_id: item.productId?.match(/^[0-9a-f-]{36}$/) ? item.productId : null,
          product_name: item.name,
          product_slug: item.slug,
          quantity: item.quantity,
          unit_price: item.unitPrice,
        }))
      );

      revalidatePath("/admin/orders");
      revalidatePath("/admin");

      return {
        success: true,
        orderNumber,
        orderId: order.id,
        subtotal,
        shippingFee,
        total,
        emailSent: false,
      };
    }

    return { success: false, error: "Impossible d'enregistrer votre commande. Réessayez." };
  }

  const result = data as {
    ok?: boolean;
    orderId?: string;
    orderNumber?: string;
    email?: { emailSent?: boolean };
  };

  if (!result?.ok || !result.orderNumber) {
    return { success: false, error: "Erreur lors de la confirmation de commande." };
  }

  revalidatePath("/admin/orders");
  revalidatePath("/admin");

  return {
    success: true,
    orderNumber: result.orderNumber,
    orderId: result.orderId ?? "",
    subtotal,
    shippingFee,
    total,
    emailSent: Boolean(result.email?.emailSent),
  };
}
