"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface OfficialAssetImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  /** URL de secours si le fichier principal est introuvable (404) */
  fallbackSrc?: string;
}

/**
 * Affichage direct du fichier PNG/JPG dans public/assets.
 * Bascule automatiquement sur fallbackSrc en cas d'erreur de chargement.
 */
export function OfficialAssetImage({
  src,
  alt,
  className,
  priority = false,
  width,
  height,
  fallbackSrc,
}: OfficialAssetImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setUsedFallback(false);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(className)}
      onError={() => {
        if (!usedFallback && fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          setUsedFallback(true);
        }
      }}
    />
  );
}
