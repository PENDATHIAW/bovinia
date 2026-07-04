"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ClipboardList,
  FileText,
  HelpCircle,
  MessageSquare,
  Settings,
  Image,
  Mail,
  BarChart3,
  LogOut,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/lib/actions/admin";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/preorders", label: "Précommandes", icon: ClipboardList },
  { href: "/admin/orders", label: "Commandes", icon: ShoppingCart },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquare },
  { href: "/admin/contacts", label: "Messages", icon: Mail },
  { href: "/admin/newsletter", label: "Newsletter", icon: Users },
  { href: "/admin/media", label: "Médias", icon: Image },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
  { href: "/admin/stats", label: "Statistiques", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-6">
        <Link href="/admin" className="font-serif text-xl font-bold text-forest">
          BOVINIA
        </Link>
        <p className="text-xs text-gray-500">Administration</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === href
                ? "bg-forest text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <Link href="/" className="mb-2 block text-xs text-gray-500 hover:text-forest">
          ← Voir le site
        </Link>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
