"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/produits", label: "Boutique" },
  { href: "/commander", label: "Commander" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/horizon-farm", label: "Horizon Farm" },
  { href: "/blog", label: "Conseils" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/15 bg-ivory/95 shadow-sm backdrop-blur-md">
      <div className="container-bovinia flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo size="md" />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-forest/80 transition-colors hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/produits" className="btn-secondary text-sm">
            Voir la gamme
          </Link>
          <Link href="/commander" className="btn-primary text-sm">
            <ShoppingBag size={16} />
            Commander
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-forest lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-gold/10 bg-ivory transition-all lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-3 text-sm font-medium text-forest hover:bg-cream"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/commander"
            className="btn-primary mt-2 text-center"
            onClick={() => setOpen(false)}
          >
            <ShoppingBag size={16} />
            Commander
          </Link>
        </nav>
      </div>
    </header>
  );
}
