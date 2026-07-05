import { cn } from "@/lib/utils";

export function GoldOrnament({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className={cn("h-px w-12 bg-gold/40", light && "bg-gold-light/50")} />
      <span className={cn("h-1.5 w-1.5 rotate-45 bg-gold", light && "bg-gold-light")} />
      <span className={cn("h-px w-12 bg-gold/40", light && "bg-gold-light/50")} />
    </div>
  );
}
