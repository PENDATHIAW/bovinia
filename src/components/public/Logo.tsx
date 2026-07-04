import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { width: 120, height: 40 },
  md: { width: 160, height: 53 },
  lg: { width: 200, height: 67 },
};

export function Logo({ className, showTagline = false, size = "md" }: LogoProps) {
  const { width, height } = sizes[size];

  return (
    <Link href="/" className={cn("inline-flex flex-col items-start", className)}>
      <Image
        src="/assets/logo/bovinia-logo.svg"
        alt="BOVINIA — Powered by Bone Broth"
        width={width}
        height={height}
        priority
        className="h-auto"
      />
      {showTagline && (
        <span className="mt-1 text-xs tracking-widest text-gold uppercase">
          Powered by Bone Broth
        </span>
      )}
    </Link>
  );
}
