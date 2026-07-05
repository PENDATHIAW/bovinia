import { GoldOrnament } from "./GoldOrnament";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <p className={cn("section-label", light && "text-gold-light")}>{label}</p>
      )}
      <h2
        className={cn(
          "mt-2 font-serif text-3xl text-forest md:text-4xl lg:text-[2.75rem] lg:leading-tight",
          light && "text-ivory"
        )}
      >
        {title}
      </h2>
      {align === "center" && <GoldOrnament className="my-5" light={light} />}
      {description && (
        <p
          className={cn(
            "text-base leading-relaxed text-foreground/70",
            light && "text-ivory/75"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
