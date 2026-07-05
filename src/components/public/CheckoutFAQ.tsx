"use client";

import { FAQAccordion } from "./FAQAccordion";

const CHECKOUT_FAQS = [
  {
    id: "shipping",
    question: "Quels sont les délais et frais de livraison ?",
    answer:
      "Livraison à Dakar sous 2 à 5 jours ouvrés, régions sous 5 à 10 jours. Frais de 2 000 FCFA, offerts dès 50 000 FCFA de commande.",
    sort_order: 1,
    is_active: true,
    created_at: "",
  },
  {
    id: "payment",
    question: "Comment payer avec Wave ou Orange Money ?",
    answer:
      "Après confirmation, notre équipe vous envoie les coordonnées de paiement par SMS ou WhatsApp sous 24 h. Votre commande est préparée dès réception.",
    sort_order: 2,
    is_active: true,
    created_at: "",
  },
  {
    id: "cod",
    question: "Puis-je payer à la livraison ?",
    answer:
      "Oui. Choisissez « Paiement à la livraison » — vous réglez le montant total en espèces au livreur à la réception de votre colis.",
    sort_order: 3,
    is_active: true,
    created_at: "",
  },
  {
    id: "track",
    question: "Comment suivre ma commande ?",
    answer:
      "Conservez votre numéro de commande. Notre équipe vous contacte par téléphone ou WhatsApp pour confirmer le paiement et la livraison.",
    sort_order: 4,
    is_active: true,
    created_at: "",
  },
];

export function CheckoutFAQ() {
  return (
    <div className="mt-8 border-t border-gold/15 pt-8">
      <p className="mb-4 font-serif text-lg text-forest">Questions fréquentes</p>
      <FAQAccordion faqs={CHECKOUT_FAQS} />
    </div>
  );
}
