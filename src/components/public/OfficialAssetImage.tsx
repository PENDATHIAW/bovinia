import { cn } from "@/lib/utils";

interface OfficialAssetImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

/**
 * Affichage direct du fichier PNG/JPG dans public/assets — sans recadrage
 * ni optimisation Next.js qui déforme les visuels officiels.
 */
export function OfficialAssetImage({
  src,
  alt,
  className,
  priority = false,
  width,
  height,
}: OfficialAssetImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(className)}
    />
  );
}
