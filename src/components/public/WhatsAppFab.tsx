"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/actions/forms";
import { cn } from "@/lib/utils";

interface WhatsAppFabProps {
  whatsappNumber: string;
}

export function WhatsAppFab({ whatsappNumber }: WhatsAppFabProps) {
  const pathname = usePathname();
  const digits = whatsappNumber.replace(/\D/g, "");
  const message = encodeURIComponent("Bonjour, j'ai une question sur BOVINIA.");
  const href = `https://wa.me/${digits}?text=${message}`;

  const isProductPage = pathname.startsWith("/produits/") && pathname !== "/produits";

  const handleClick = () => {
    void trackEvent("whatsapp_click", pathname);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Contacter BOVINIA sur WhatsApp"
      className={cn(
        "fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl",
        isProductPage ? "bottom-24 md:bottom-6" : "bottom-6"
      )}
    >
      <MessageCircle size={26} strokeWidth={2} />
    </a>
  );
}
