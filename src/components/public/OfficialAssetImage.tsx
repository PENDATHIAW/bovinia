"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { pngFallbackForWebp } from "@/lib/data/assetPaths";

interface OfficialAssetImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  fallbackSrc?: string;
}

export function OfficialAssetImage({
  src,
  alt,
  className,
  priority = false,
  width = 800,
  height = 1000,
  fill = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fallbackSrc,
}: OfficialAssetImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setUsedFallback(false);
  }, [src]);

  const handleError = () => {
    if (usedFallback) return;
    const pngFromWebp = pngFallbackForWebp(currentSrc);
    if (pngFromWebp && currentSrc !== pngFromWebp) {
      setCurrentSrc(pngFromWebp);
      return;
    }
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setUsedFallback(true);
    }
  };

  if (fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(className)}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={cn(className)}
      onError={handleError}
    />
  );
}
