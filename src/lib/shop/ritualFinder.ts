export interface RitualQuestion {
  id: string;
  question: string;
  options: { id: string; label: string; scores: Partial<Record<string, number>> }[];
}

export const RITUAL_QUESTIONS: RitualQuestion[] = [
  {
    id: "goal",
    question: "Quel est votre objectif principal ?",
    options: [
      { id: "daily", label: "Bien-être et énergie au quotidien", scores: { wellness: 3, pulse: 1 } },
      { id: "pregnancy", label: "Grossesse ou post-partum", scores: { bloom: 4, wellness: 1 } },
      { id: "cycle", label: "Confort pendant le cycle", scores: { period: 4, calm: 2 } },
      { id: "sport", label: "Sport et récupération", scores: { pulse: 4, wellness: 2 } },
      { id: "sleep", label: "Sommeil et détente", scores: { calm: 4, period: 1 } },
    ],
  },
  {
    id: "moment",
    question: "À quel moment souhaitez-vous le consommer ?",
    options: [
      { id: "morning", label: "Le matin", scores: { wellness: 2, bloom: 2, pulse: 2 } },
      { id: "evening", label: "Le soir", scores: { calm: 3, period: 2 } },
      { id: "sport", label: "Avant ou après l'effort", scores: { pulse: 3, wellness: 1 } },
      { id: "anytime", label: "À tout moment", scores: { wellness: 2, bloom: 1, calm: 1 } },
    ],
  },
  {
    id: "taste",
    question: "Quelle saveur vous attire le plus ?",
    options: [
      { id: "tropical", label: "Fruits tropicaux frais", scores: { wellness: 3 } },
      { id: "creamy", label: "Crémeux mangue & coco", scores: { bloom: 3 } },
      { id: "spicy", label: "Épicé & gingembre", scores: { pulse: 3, period: 1 } },
      { id: "warm", label: "Douceur cannelle & vanille", scores: { calm: 3, period: 2 } },
    ],
  },
];

export function computeRitualRecommendation(
  answers: Record<string, string>
): { slug: string; scores: Record<string, number> } {
  const scores: Record<string, number> = {
    wellness: 0,
    bloom: 0,
    period: 0,
    pulse: 0,
    calm: 0,
  };

  for (const question of RITUAL_QUESTIONS) {
    const answerId = answers[question.id];
    const option = question.options.find((o) => o.id === answerId);
    if (!option) continue;
    for (const [slug, pts] of Object.entries(option.scores)) {
      scores[slug] = (scores[slug] ?? 0) + (pts ?? 0);
    }
  }

  const slug = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "wellness";
  return { slug, scores };
}

export const RITUAL_SUMMARIES: Record<string, { tagline: string; reason: string }> = {
  wellness: {
    tagline: "Votre rituel du matin",
    reason: "Idéal pour une routine bien-être quotidienne, digestion et énergie naturelle.",
  },
  bloom: {
    tagline: "Accompagnement maternité",
    reason: "Conçu pour les femmes enceintes et jeunes mamans, doux et nourrissant.",
  },
  period: {
    tagline: "Confort du cycle",
    reason: "Formulé pour accompagner le confort pendant le cycle féminin.",
  },
  pulse: {
    tagline: "Énergie & récupération",
    reason: "Parfait avant ou après l'effort, pour la vitalité et la récupération.",
  },
  calm: {
    tagline: "Rituel du soir",
    reason: "Pour une routine apaisante en fin de journée et un sommeil serein.",
  },
};
