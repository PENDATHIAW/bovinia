"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/shop/CartContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/produits", label: "Boutique" },
  { href: "/quel-rituel", label: "Quel rituel ?" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/horizon-farm", label: "Horizon Farm" },
  { href: "/blog", label: "Conseils" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/produits") {
    return pathname === "/produits" || pathname.startsWith("/produits/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, openDrawer, hydrated } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-ivory/95 shadow-sm backdrop-blur-md">
      <div className="container-bovinia flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo size="md" />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive(pathname, link.href)
                  ? "text-forest"
                  : "text-forest/70 hover:text-forest"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/produits" className="btn-secondary text-sm">
            Voir la gamme
          </Link>
          <button type="button" onClick={openDrawer} className="btn-primary relative text-sm">
            <ShoppingBag size={16} />
            Panier
            {hydrated && itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-forest">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openDrawer}
            className="relative rounded-lg p-2 text-forest"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag size={22} />
            {hydrated && itemCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-forest">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-forest"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-gold/10 bg-ivory transition-all lg:hidden",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-3 text-sm font-medium",
                isActive(pathname, link.href)
                  ? "bg-cream text-forest"
                  : "text-forest hover:bg-cream"
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/commander"
            className="btn-gold mt-2 text-center"
            onClick={() => setOpen(false)}
          >
            Commander
          </Link>
        </nav>
      </div>
    </header>
  );
}
