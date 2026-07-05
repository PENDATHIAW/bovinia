import { cn } from "@/lib/utils";
import { PRODUCT_COLORS } from "@/types/database";

interface ProductPotPlaceholderProps {
  name: string;
  mission: string;
  colorTheme: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: { container: "h-40", name: "text-lg", mission: "text-[10px]", badge: "text-[8px]" },
  md: { container: "h-64", name: "text-2xl", mission: "text-xs", badge: "text-[10px]" },
  lg: { container: "h-80 md:h-96", name: "text-3xl md:text-4xl", mission: "text-sm", badge: "text-xs" },
};

export function ProductPotPlaceholder({
  name,
  mission,
  colorTheme,
  size = "md",
  className,
}: ProductPotPlaceholderProps) {
  const colors = PRODUCT_COLORS[colorTheme] ?? PRODUCT_COLORS.wellness;
  const styles = sizeStyles[size];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-end overflow-hidden rounded-3xl pb-6 pt-8",
        styles.container,
        className
      )}
      style={{
        background: `linear-gradient(165deg, ${colors.accent}28 0%, ${colors.accent}12 45%, #FAF7F2 100%)`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1/2 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${colors.accent}55 0%, transparent 70%)`,
        }}
      />

      {/* Silhouette pot stylisée — forme abstraite, pas un packaging recréé */}
      <div
        className="relative mb-4 flex flex-col items-center"
        aria-hidden
      >
        <div
          className="h-3 w-20 rounded-t-full border-2 border-b-0 opacity-60"
          style={{ borderColor: colors.accent }}
        />
        <div
          className="flex h-28 w-24 items-center justify-center rounded-b-2xl rounded-t-sm border-2 shadow-inner sm:h-32 sm:w-28"
          style={{
            borderColor: `${colors.accent}99`,
            background: `linear-gradient(180deg, ${colors.accent}22 0%, ${colors.accent}08 100%)`,
          }}
        >
          <span
            className="font-serif font-bold tracking-wider opacity-90"
            style={{ color: colors.accent, fontSize: size === "lg" ? "1.5rem" : "1.1rem" }}
          >
            {name.charAt(0)}
          </span>
        </div>
      </div>

      <p className={cn("relative z-10 font-serif font-semibold text-forest", styles.name)}>
        {name}
      </p>
      <p className={cn("relative z-10 mt-1 uppercase tracking-widest text-foreground/50", styles.mission)}>
        {mission}
      </p>
      <span
        className={cn(
          "relative z-10 mt-3 rounded-full px-3 py-1 font-medium uppercase tracking-wider",
          styles.badge
        )}
        style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
      >
        500 g · ~30 portions
      </span>
    </div>
  );
}
