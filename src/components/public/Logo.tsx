import Link from "next/link";
import { cn } from "@/lib/utils";
import { OFFICIAL_IMAGES } from "@/lib/data/officialImages";
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
        src={OFFICIAL_IMAGES.logo}
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
      src={OFFICIAL_IMAGES.logoIcon}
      alt="BOVINIA"
      className={cn("h-10 w-10 object-contain", className)}
    />
  );
}
