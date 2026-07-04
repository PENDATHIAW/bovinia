import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Affiche le logo sur fond ivoire (footer vert foncé) */
  onDark?: boolean;
}

const sizes = {
  sm: { width: 100, height: 120 },
  md: { width: 140, height: 168 },
  lg: { width: 180, height: 216 },
};

export function Logo({ className, size = "md", onDark = false }: LogoProps) {
  const { width, height } = sizes[size];

  const image = (
    <Image
      src="/assets/logo/bovinia-logo.png"
      alt="BOVINIA — Powered by Bone Broth"
      width={width}
      height={height}
      priority={size !== "sm"}
      className="h-auto w-auto object-contain"
      style={{ maxWidth: width, maxHeight: height }}
    />
  );

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 transition-opacity hover:opacity-90",
        onDark && "rounded-2xl bg-ivory p-3 shadow-sm",
        className
      )}
    >
      {image}
    </Link>
  );
}
