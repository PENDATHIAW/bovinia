import Link from "next/link";
import { cn } from "@/lib/utils";
import { ASSETS } from "@/lib/data/assetPaths";
import { OfficialAssetImage } from "./OfficialAssetImage";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}

const sizes = {
  sm: "h-12 w-auto max-w-[9.5rem]",
  md: "h-16 w-auto max-w-[12rem]",
  lg: "h-24 w-auto max-w-[18rem]",
};

export function Logo({ className, size = "md", onDark = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 transition-opacity hover:opacity-90",
        onDark && "rounded-2xl bg-ivory p-3 shadow-sm",
        className
      )}
    >
      <OfficialAssetImage
        src={ASSETS.logo}
        alt="BOVINIA — Powered by Bone Broth"
        priority
        className={cn("h-auto object-contain", sizes[size])}
      />
    </Link>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <OfficialAssetImage
      src={ASSETS.logoIcon}
      alt="BOVINIA"
      className={cn("h-10 w-10 object-contain", className)}
    />
  );
}
