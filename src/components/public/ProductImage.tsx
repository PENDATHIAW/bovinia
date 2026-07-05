"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallback: React.ReactNode;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  width,
  height,
  className,
  fallback,
  priority = false,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <>{fallback}</>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

interface LifestyleImageProps {
  src?: string | null;
  alt: string;
  fallback: React.ReactNode;
}

export function LifestyleImage({ src, alt, fallback }: LifestyleImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <>{fallback}</>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={675}
      className="h-auto w-full object-cover"
      sizes="(max-width: 1024px) 100vw, 1200px"
      onError={() => setFailed(true)}
    />
  );
}

export function LogoImage({
  src,
  alt,
  width,
  height,
  className,
  fallback,
  priority = false,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className={cn(className)}>{fallback}</div>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
