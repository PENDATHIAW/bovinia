import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/database";

export function HeroShowcase({ products }: { products: Product[] }) {
  return (
    <div className="relative mx-auto flex max-w-lg items-end justify-center gap-2 sm:gap-3 lg:max-w-none">
      {products.map((product, i) => {
        if (!product.image) return null;

        return (
          <Link
            key={product.id}
            href={`/produits/${product.slug}`}
            className={cn(
              "group relative transition-all duration-300 hover:-translate-y-3 hover:z-10",
              i === 2 && "z-[2] scale-110"
            )}
            style={{ transform: `rotate(${(i - 2) * 3}deg)` }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={i === 2 ? 130 : 100}
              height={i === 2 ? 170 : 130}
              priority={i === 2}
              className="h-auto w-auto object-contain drop-shadow-2xl transition-transform group-hover:scale-105"
              style={{ width: i === 2 ? 130 : 100, height: "auto" }}
            />
          </Link>
        );
      })}
    </div>
  );
}
