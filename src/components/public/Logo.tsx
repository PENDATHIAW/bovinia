import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BoviniaLogoMark } from "./BoviniaLogoMark";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}

const sizes = {
  sm: { width: 140, height: 88, svg: "max-w-[120px]" },
  md: { width: 180, height: 110, svg: "max-w-[160px]" },
  lg: { width: 240, height: 145, svg: "max-w-[220px]" },
};

export function Logo({ className, size = "md", onDark = false }: LogoProps) {
  const { width, height, svg } = sizes[size];

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 transition-opacity hover:opacity-90",
        onDark && "rounded-2xl bg-ivory p-3 shadow-sm",
        className
      )}
    >
      <Image
        src="/assets/logo/bovinia-logo.png"
        alt="BOVINIA — Powered by Bone Broth"
        width={width}
        height={height}
        priority={size !== "sm"}
        className={cn("h-auto object-contain", svg)}
      />
    </Link>
  );
}

/** Variante SVG pour favicon / petits espaces */
export function LogoIcon({ className }: { className?: string }) {
  return <BoviniaLogoMark variant="icon" className={cn("w-10", className)} />;
}
