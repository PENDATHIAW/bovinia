import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Affiche le logo sur fond ivoire (footer vert foncé) */
  onDark?: boolean;
}

/** Logo officiel BOVINIA — ratio ~3:2 (1536×1024) */
const sizes = {
  sm: { width: 120, height: 80 },
  md: { width: 160, height: 107 },
  lg: { width: 220, height: 147 },
};

export function Logo({ className, size = "md", onDark = false }: LogoProps) {
  const { width, height } = sizes[size];

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
        className="h-auto w-auto object-contain"
        style={{ maxWidth: width, maxHeight: height }}
      />
    </Link>
  );
}
