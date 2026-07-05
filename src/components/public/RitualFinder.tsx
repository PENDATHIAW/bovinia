"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import type { Product } from "@/types/database";
import { ProductPotImage } from "./ProductPotImage";
import { AddToCartButton } from "./AddToCartButton";
import {
  RITUAL_QUESTIONS,
  RITUAL_SUMMARIES,
  computeRitualRecommendation,
  getRecommendationReason,
  getVisibleQuestionOptions,
} from "@/lib/shop/ritualFinder";
import { cn } from "@/lib/utils";

interface RitualFinderProps {
  products: Product[];
  compact?: boolean;
}

export function RitualFinder({ products, compact = false }: RitualFinderProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const currentQuestion = RITUAL_QUESTIONS[step];
  const product = result ? products.find((p) => p.slug === result) : null;
  const summary = result ? RITUAL_SUMMARIES[result] : null;

  function selectOption(questionId: string, optionId: string) {
    const nextAnswers = { ...answers, [questionId]: optionId };
    setAnswers(nextAnswers);

    if (step < RITUAL_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const { slug } = computeRitualRecommendation(nextAnswers);
      setResult(slug);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  if (result && product && summary) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-ivory via-cream to-ivory p-6 shadow-lg md:p-10",
          compact && "p-6"
        )}
      >
        <div className="flex items-center gap-2 text-gold">
          <Sparkles size={18} />
          <p className="text-sm font-medium uppercase tracking-widest">Votre rituel</p>
        </div>
        <h3 className="mt-2 font-serif text-2xl text-forest md:text-3xl">{product.name}</h3>
        <p className="mt-1 text-sm text-gold">{summary.tagline}</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/70">
          {getRecommendationReason(result, answers)}
        </p>

        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row">
          <ProductPotImage product={product} size="md" className="shrink-0" />
          <div className="flex flex-col gap-3 sm:items-start">
            <AddToCartButton product={product} variant="gold" showQuantity openDrawerOnAdd />
            <Link href={`/produits/${product.slug}`} className="btn-secondary text-sm">
              Voir la fiche produit
              <ArrowRight size={14} />
            </Link>
            <button type="button" onClick={reset} className="text-sm text-foreground/50 hover:text-forest">
              <RotateCcw size={14} className="mr-1 inline" />
              Recommencer le quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] border border-gold/25 bg-gradient-to-br from-cream/80 to-ivory p-6 shadow-md md:p-10",
        compact && "p-6"
      )}
    >
      {!compact && (
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Guide personnalisé</p>
          <h2 className="mt-2 font-serif text-3xl text-forest">Quel rituel pour moi ?</h2>
          <p className="mt-3 text-sm text-foreground/60">
            3 questions pour trouver le rituel adapté — besoin, moment et saveur, sans incohérence
            (ex. : pas de PULSE le soir).
          </p>
        </div>
      )}

      <div className="mb-6 flex gap-2">
        {RITUAL_QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full",
              i <= step ? "bg-gold" : "bg-forest/10"
            )}
          />
        ))}
      </div>

      <p className="font-serif text-xl text-forest md:text-2xl">{currentQuestion.question}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {getVisibleQuestionOptions(currentQuestion.id, answers).map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => selectOption(currentQuestion.id, option.id)}
            className="rounded-2xl border border-gold/20 bg-ivory px-5 py-4 text-left text-sm text-forest shadow-sm transition-all hover:border-gold hover:bg-gold/5 hover:shadow-md"
          >
            <span className="block">{option.label}</span>
            {option.hint && (
              <span className="mt-1 block text-xs text-foreground/50">{option.hint}</span>
            )}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="mt-6 text-sm text-foreground/50 hover:text-forest"
        >
          Question précédente
        </button>
      )}
    </div>
  );
}
