"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types/database";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div key={faq.id} className="card-premium overflow-hidden">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 p-5 text-left"
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            aria-expanded={openId === faq.id}
          >
            <span className="font-serif text-base text-forest sm:text-lg">
              {faq.question}
            </span>
            <ChevronDown
              size={20}
              className={cn(
                "shrink-0 text-gold transition-transform",
                openId === faq.id && "rotate-180"
              )}
            />
          </button>
          {openId === faq.id && (
            <div className="border-t border-gold/10 px-5 pb-5 pt-3">
              <p className="text-sm leading-relaxed text-foreground/70">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
