import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}

const sizes = {
  sm: { width: 140, height: 88, className: "max-w-[120px]" },
  md: { width: 180, height: 110, className: "max-w-[160px]" },
  lg: { width: 240, height: 145, className: "max-w-[220px]" },
};

/** Logo officiel PNG uniquement. */
export function Logo({ className, size = "md", onDark = false }: LogoProps) {
  const { width, height, className: imgClass } = sizes[size];

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
        className={cn("h-auto object-contain", imgClass)}
      />
    </Link>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/assets/logo/bovinia-logo-icon.png"
      alt="BOVINIA"
      width={40}
      height={40}
      className={cn("h-10 w-10 object-contain", className)}
    />
  );
}
