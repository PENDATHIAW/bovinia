"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/shop/CartContext";
import { DISCOVERY_PACKS } from "./DiscoveryPacks";
import { cn } from "@/lib/utils";

interface AddPackButtonProps {
  packId: string;
  className?: string;
  label?: string;
}

export function AddPackButton({
  packId,
  className,
  label = "Ajouter au panier",
}: AddPackButtonProps) {
  const { addPack, openDrawer } = useCart();
  const pack = DISCOVERY_PACKS.find((p) => p.id === packId);

  if (!pack) return null;

  return (
    <button
      type="button"
      className={cn("btn-gold text-center text-sm", className)}
      onClick={() => {
        addPack(packId);
        openDrawer();
      }}
    >
      <ShoppingBag size={16} />
      {label}
    </button>
  );
}
