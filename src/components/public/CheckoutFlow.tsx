"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { submitCheckout } from "@/lib/actions/checkout";
import { DISCOVERY_PACKS } from "@/components/public/DiscoveryPacks";
import { ShippingProgress } from "@/components/public/ShippingProgress";
import { CheckoutFAQ } from "@/components/public/CheckoutFAQ";
import { useCart } from "@/lib/shop/CartContext";
import {
  buildInitialCart,
  PAYMENT_INSTRUCTIONS,
  PAYMENT_METHODS,
  type CartLine,
  type PaymentMethodId,
} from "@/lib/shop/cart";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/database";

interface CheckoutFlowProps {
  products: Product[];
  defaultProduct?: string;
  defaultPack?: string;
  compact?: boolean;
}

type Step = "cart" | "delivery" | "payment" | "confirm";

const STEPS: { id: Step; label: string }[] = [
  { id: "cart", label: "Panier" },
  { id: "delivery", label: "Livraison" },
  { id: "payment", label: "Paiement" },
  { id: "confirm", label: "Confirmation" },
];

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
}

interface OrderConfirmation {
  orderNumber: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  emailSent: boolean;
  paymentMethod: string;
  paymentMethodId: PaymentMethodId;
  lines: CartLine[];
  customer: CustomerForm;
}

export function CheckoutFlow({
  products,
  defaultProduct,
  defaultPack,
  compact = false,
}: CheckoutFlowProps) {
  const {
    cart,
    subtotal,
    shippingFee,
    total,
    addProduct,
    addPack,
    updateQuantity,
    removeLine,
    clearCart,
    mergeLines,
    hydrated,
  } = useCart();

  const [step, setStep] = useState<Step>("cart");
  const [customer, setCustomer] = useState<CustomerForm>({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("wave");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);
  const [pending, startTransition] = useTransition();
  const mergedRef = useRef(false);

  useEffect(() => {
    if (!hydrated || mergedRef.current) return;
    if (defaultProduct || defaultPack) {
      const initial = buildInitialCart(products, defaultProduct, defaultPack);
      if (initial.length) mergeLines(initial);
    }
    mergedRef.current = true;
  }, [hydrated, defaultProduct, defaultPack, products, mergeLines]);

  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const paymentInfo = PAYMENT_INSTRUCTIONS[paymentMethod];

  function goNext() {
    setError(null);
    if (step === "cart" && cart.length === 0) {
      setError("Ajoutez au moins un produit à votre panier.");
      return;
    }
    if (step === "delivery") {
      if (!customer.name || !customer.email || !customer.phone || !customer.city || !customer.address) {
        setError("Remplissez tous les champs de livraison.");
        return;
      }
    }
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next.id);
  }

  function goBack() {
    setError(null);
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev.id);
  }

  function handleConfirm() {
    setError(null);
    startTransition(async () => {
      const result = await submitCheckout({
        customer,
        lines: cart,
        paymentMethod,
        note: note || undefined,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setConfirmation({
        orderNumber: result.orderNumber,
        subtotal: result.subtotal,
        shippingFee: result.shippingFee,
        total: result.total,
        emailSent: result.emailSent,
        paymentMethod:
          PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label ?? paymentMethod,
        paymentMethodId: paymentMethod,
        lines: [...cart],
        customer: { ...customer },
      });
      clearCart();
      setStep("confirm");
    });
  }

  if (confirmation) {
    const confirmPayment = PAYMENT_INSTRUCTIONS[confirmation.paymentMethodId];
    return (
      <div className="rounded-2xl border border-gold/20 bg-cream/40 p-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-ivory">
            <Check size={28} />
          </div>
          <p className="mt-4 font-serif text-2xl text-forest">Commande confirmée</p>
          <p className="mt-2 text-sm text-foreground/70">
            Merci {confirmation.customer.name.split(" ")[0]} — votre commande est enregistrée.
          </p>
          <p className="mt-4 rounded-xl border border-gold/30 bg-ivory px-4 py-3 font-serif text-xl text-forest">
            N° {confirmation.orderNumber}
          </p>
          {confirmation.emailSent ? (
            <p className="mt-3 text-sm text-foreground/60">
              Un email récapitulatif a été envoyé à {confirmation.customer.email}.
            </p>
          ) : (
            <p className="mt-3 text-sm text-foreground/60">
              Conservez votre numéro de commande. Notre équipe vous contactera pour le paiement et
              la livraison.
            </p>
          )}
        </div>

        <div className="mx-auto mt-6 max-w-md rounded-xl border border-gold/20 bg-ivory p-5 text-left">
          <p className="font-medium text-forest">Prochaines étapes — {confirmation.paymentMethod}</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-foreground/70">
            {confirmPayment.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>

        <div className="mx-auto mt-8 max-w-md space-y-2 text-sm">
          {confirmation.lines.map((line) => (
            <div key={line.key} className="flex justify-between text-foreground/70">
              <span>
                {line.name} × {line.quantity}
              </span>
              <span>{formatPrice(line.unitPrice * line.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-gold/15 pt-2">
            <div className="flex justify-between text-foreground/70">
              <span>Sous-total</span>
              <span>{formatPrice(confirmation.subtotal)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Livraison</span>
              <span>
                {confirmation.shippingFee === 0 ? "Offerte" : formatPrice(confirmation.shippingFee)}
              </span>
            </div>
            <div className="mt-1 flex justify-between font-medium text-forest">
              <span>Total</span>
              <span>{formatPrice(confirmation.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/produits" className="btn-secondary">
            Continuer mes achats
          </Link>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setConfirmation(null);
              setStep("cart");
              setCustomer({ name: "", email: "", phone: "", city: "", address: "" });
            }}
          >
            Nouvelle commande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {!compact && (
        <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          {STEPS.filter((s) => s.id !== "confirm").map((s, i) => (
            <span key={s.id} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
                  stepIndex >= i ? "bg-forest text-ivory" : "bg-cream text-foreground/40"
                )}
              >
                {i + 1}
              </span>
              <span className={stepIndex >= i ? "text-forest" : "text-foreground/40"}>
                {s.label}
              </span>
              {i < STEPS.length - 2 && <ChevronRight size={14} className="text-foreground/30" />}
            </span>
          ))}
        </nav>
      )}

      {error && (
        <div className="rounded-xl border border-gold/30 bg-cream px-4 py-3 text-sm text-forest">
          {error}
        </div>
      )}

      {step === "cart" && (
        <div className="space-y-6">
          {cart.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gold/30 p-8 text-center">
              <ShoppingBag size={32} className="mx-auto text-forest/30" />
              <p className="mt-3 text-sm text-foreground/60">Votre panier est vide.</p>
              <Link href="/produits" className="btn-secondary mt-4 inline-flex">
                Découvrir la gamme
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {cart.map((line) => (
                  <li
                    key={line.key}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/15 bg-ivory p-4"
                  >
                    <div>
                      <p className="font-medium text-forest">{line.name}</p>
                      <p className="text-sm text-foreground/50">
                        {formatPrice(line.unitPrice)} / unité
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-forest/20">
                        <button
                          type="button"
                          className="p-2 text-forest hover:bg-cream"
                          onClick={() => updateQuantity(line.key, line.quantity - 1)}
                          aria-label="Diminuer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          className="p-2 text-forest hover:bg-cream"
                          onClick={() => updateQuantity(line.key, line.quantity + 1)}
                          aria-label="Augmenter"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="min-w-[5rem] text-right font-medium text-forest">
                        {formatPrice(line.unitPrice * line.quantity)}
                      </span>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-foreground/40 hover:bg-cream hover:text-forest"
                        onClick={() => removeLine(line.key)}
                        aria-label="Retirer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <ShippingProgress />
            </>
          )}

          <div className="rounded-xl border border-gold/15 bg-cream/60 p-4 text-sm">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-1 flex justify-between text-foreground/60">
              <span>Livraison</span>
              <span>{shippingFee === 0 && subtotal > 0 ? "Offerte" : formatPrice(shippingFee)}</span>
            </div>
            <div className="mt-2 flex justify-between font-medium text-forest">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {!compact && cart.length > 0 && (
            <div>
              <p className="label-field mb-2">Ajouter un rituel</p>
              <div className="flex flex-wrap gap-2">
                {products.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="rounded-full border border-forest/20 px-3 py-1.5 text-xs text-forest hover:bg-cream"
                    onClick={() => addProduct(p)}
                  >
                    + {p.name}
                  </button>
                ))}
              </div>
              <p className="label-field mb-2 mt-4">Ajouter un pack</p>
              <div className="flex flex-wrap gap-2">
                {DISCOVERY_PACKS.map((pack) => (
                  <button
                    key={pack.id}
                    type="button"
                    className="rounded-full border border-gold/40 px-3 py-1.5 text-xs text-forest hover:bg-gold/10"
                    onClick={() => addPack(pack.id)}
                  >
                    + {pack.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {step === "delivery" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="checkout-name" className="label-field">
              Nom complet *
            </label>
            <input
              id="checkout-name"
              required
              className="input-field"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="checkout-email" className="label-field">
              Email *
            </label>
            <input
              id="checkout-email"
              type="email"
              required
              className="input-field"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="checkout-phone" className="label-field">
              Téléphone *
            </label>
            <input
              id="checkout-phone"
              type="tel"
              required
              className="input-field"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="checkout-city" className="label-field">
              Ville *
            </label>
            <input
              id="checkout-city"
              required
              className="input-field"
              value={customer.city}
              onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="checkout-address" className="label-field">
              Adresse de livraison *
            </label>
            <textarea
              id="checkout-address"
              required
              rows={2}
              className="input-field resize-none"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
            />
          </div>
          {!compact && (
            <div className="sm:col-span-2">
              <label htmlFor="checkout-note" className="label-field">
                Instructions de livraison (optionnel)
              </label>
              <textarea
                id="checkout-note"
                rows={2}
                className="input-field resize-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          )}
          <p className="sm:col-span-2 text-xs text-foreground/50">
            Livraison Dakar et régions · 2 000 FCFA · offerte dès 50 000 FCFA.{" "}
            <Link href="/livraison" className="text-gold underline">
              En savoir plus
            </Link>
          </p>
        </div>
      )}

      {step === "payment" && (
        <div className="space-y-4">
          <p className="text-sm text-foreground/70">
            Choisissez votre mode de paiement. Votre commande est confirmée sur le site — nous vous
            guidons ensuite pour le règlement.
          </p>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method.id}
                className={cn(
                  "flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition-colors",
                  paymentMethod === method.id
                    ? "border-gold bg-gold/5"
                    : "border-forest/10 hover:border-gold/30"
                )}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="text-forest"
                  />
                  <span className="font-medium text-forest">{method.label}</span>
                </span>
                <span className="pl-7 text-xs text-foreground/60">
                  {PAYMENT_INSTRUCTIONS[method.id].summary}
                </span>
              </label>
            ))}
          </div>

          <div className="rounded-xl border border-gold/15 bg-cream/60 p-4 text-sm">
            <p className="font-medium text-forest">Comment ça marche</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-foreground/70">
              {paymentInfo.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl border border-gold/15 bg-ivory p-4 text-sm">
            <p className="font-medium text-forest">Récapitulatif</p>
            <ul className="mt-2 space-y-1 text-foreground/70">
              {cart.map((line) => (
                <li key={line.key} className="flex justify-between">
                  <span>
                    {line.name} × {line.quantity}
                  </span>
                  <span>{formatPrice(line.unitPrice * line.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-gold/15 pt-3 font-medium text-forest">
              <span>Total TTC</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {stepIndex > 0 && step !== "confirm" ? (
          <button type="button" className="btn-secondary" onClick={goBack}>
            <ChevronLeft size={16} />
            Retour
          </button>
        ) : (
          <span />
        )}

        {step === "cart" && (
          <button type="button" className="btn-primary" onClick={goNext} disabled={cart.length === 0}>
            Livraison
            <ChevronRight size={16} />
          </button>
        )}
        {step === "delivery" && (
          <button type="button" className="btn-primary" onClick={goNext}>
            Paiement
            <ChevronRight size={16} />
          </button>
        )}
        {step === "payment" && (
          <button type="button" className="btn-gold" onClick={handleConfirm} disabled={pending}>
            {pending ? "Confirmation..." : "Confirmer ma commande"}
          </button>
        )}
      </div>

      {!compact && step !== "confirm" && <CheckoutFAQ />}
    </div>
  );
}
