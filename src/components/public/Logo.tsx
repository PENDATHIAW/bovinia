import Link from "next/link";
import { cn } from "@/lib/utils";
import { OfficialAssetImage } from "./OfficialAssetImage";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}

const sizes = {
  sm: "max-h-14 w-auto",
  md: "max-h-[4.5rem] w-auto",
  lg: "max-h-28 w-auto",
};

// Fichiers logo officiels restaurés depuis le commit où les assets étaient bien présents.
// Cela évite le logo vide actuel dans public/assets/logo/ et empêche toute recréation en code.
const OFFICIAL_LOGO_SRC =
  "https://raw.githubusercontent.com/PENDATHIAW/bovinia/0719c9df9b408176d17d13919cfd5b92efdac123/public/assets/logo/bovinia-logo.png";
const OFFICIAL_LOGO_ICON_SRC =
  "https://raw.githubusercontent.com/PENDATHIAW/bovinia/0719c9df9b408176d17d13919cfd5b92efdac123/public/assets/logo/bovinia-logo-icon.png";

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
        src={OFFICIAL_LOGO_SRC}
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
      src={OFFICIAL_LOGO_ICON_SRC}
      alt="BOVINIA"
      className={cn("h-10 w-10 object-contain", className)}
    />
  );
}
