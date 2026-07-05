export interface RitualQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    label: string;
    hint?: string;
    scores: Partial<Record<string, number>>;
  }[];
}

export const RITUAL_QUESTIONS: RitualQuestion[] = [
  {
    id: "need",
    question: "Que recherchez-vous en priorité ?",
    options: [
      {
        id: "daily",
        label: "Bien-être et énergie au quotidien",
        hint: "Routine matinale, digestion, vitalité naturelle",
        scores: { wellness: 4, pulse: 1 },
      },
      {
        id: "maternity",
        label: "Grossesse ou post-partum",
        hint: "Accompagnement doux maman & bébé",
        scores: { bloom: 5, wellness: 1 },
      },
      {
        id: "cycle",
        label: "Confort pendant le cycle",
        hint: "Règles, ballonnements, fatigue cyclique",
        scores: { period: 5, calm: 1 },
      },
      {
        id: "energy_sport",
        label: "Énergie, sport et récupération physique",
        hint: "Avant l'effort, après l'entraînement, journée active",
        scores: { pulse: 5, wellness: 1 },
      },
      {
        id: "sleep_calm",
        label: "Sommeil, détente et rituel du soir",
        hint: "Relaxation, fin de journée, préparation au repos",
        scores: { calm: 5, period: 1 },
      },
    ],
  },
  {
    id: "moment",
    question: "À quel moment souhaitez-vous le consommer ?",
    options: [
      {
        id: "morning",
        label: "Le matin",
        scores: { wellness: 2, bloom: 2, pulse: 2 },
      },
      {
        id: "evening",
        label: "Le soir, avant de dormir",
        scores: { calm: 4, period: 2 },
      },
      {
        id: "workout",
        label: "Avant ou après l'effort sportif",
        scores: { pulse: 4, wellness: 1 },
      },
      {
        id: "anytime",
        label: "À tout moment de la journée",
        scores: { wellness: 2, bloom: 1, calm: 1, period: 1 },
      },
    ],
  },
  {
    id: "taste",
    question: "Quelle saveur vous attire le plus ?",
    options: [
      {
        id: "tropical",
        label: "Fruits tropicaux frais (ananas, mandarine)",
        scores: { wellness: 3 },
      },
      {
        id: "creamy",
        label: "Crémeux mangue & coco",
        scores: { bloom: 3, calm: 1 },
      },
      {
        id: "spicy",
        label: "Énergisant mangue, orange & gingembre",
        scores: { pulse: 4 },
      },
      {
        id: "warm",
        label: "Douceur verveine, camomille & vanille",
        scores: { calm: 4, period: 2 },
      },
      {
        id: "floral",
        label: "Bissap, mandarine & cannelle",
        scores: { period: 4, calm: 1 },
      },
    ],
  },
];

/** Options de saveur filtrées selon les réponses précédentes */
export function getTasteOptions(answers: Record<string, string>) {
  const need = answers.need;
  const moment = answers.moment;
  const wantsCalm = need === "sleep_calm" || moment === "evening";
  const wantsEnergy = need === "energy_sport" || moment === "workout";

  return RITUAL_QUESTIONS[2].options.filter((option) => {
    if (wantsCalm && option.id === "spicy") return false;
    if (wantsEnergy && option.id === "warm") return false;
    if (need === "maternity" && option.id === "spicy") return false;
    if (need === "cycle" && option.id === "spicy") return false;
    return true;
  });
}

export function getVisibleQuestionOptions(
  questionId: string,
  answers: Record<string, string>
): RitualQuestion["options"] {
  const question = RITUAL_QUESTIONS.find((q) => q.id === questionId);
  if (!question) return [];
  if (questionId === "taste") return getTasteOptions(answers);
  return question.options;
}

const SLUGS = ["wellness", "bloom", "period", "pulse", "calm"] as const;

function applyRecommendationRules(
  scores: Record<string, number>,
  answers: Record<string, string>
): Record<string, number> {
  const next = { ...scores };
  const need = answers.need;
  const moment = answers.moment;

  const wantsSleep = need === "sleep_calm" || moment === "evening";
  const wantsSport = need === "energy_sport" || moment === "workout";

  // PULSE (orange, mangue, gingembre) jamais le soir ou pour le sommeil
  if (wantsSleep) {
    next.pulse = -999;
  }

  if (need === "sleep_calm") {
    next.calm += 3;
    if (moment === "evening") next.calm += 2;
  } else if (moment === "evening") {
    next.calm += 2;
    next.period += 1;
  }

  if (wantsSport && !wantsSleep) {
    next.calm = -999;
    next.pulse += 2;
  }

  if (need === "maternity") {
    next.bloom += 2;
    next.pulse = -999;
  }

  if (need === "cycle") {
    next.period += 2;
  }

  // Conflit explicite : énergie sportive + rituel du soir → le moment prime
  if (moment === "evening" && need === "energy_sport") {
    next.pulse = -999;
    next.calm += 4;
  }

  return next;
}

export function computeRitualRecommendation(
  answers: Record<string, string>
): { slug: string; scores: Record<string, number> } {
  const scores: Record<string, number> = Object.fromEntries(SLUGS.map((s) => [s, 0]));

  for (const question of RITUAL_QUESTIONS) {
    const answerId = answers[question.id];
    const options =
      question.id === "taste" ? getTasteOptions(answers) : question.options;
    const option = options.find((o) => o.id === answerId);
    if (!option) continue;
    for (const [slug, pts] of Object.entries(option.scores)) {
      scores[slug] = (scores[slug] ?? 0) + (pts ?? 0);
    }
  }

  const adjusted = applyRecommendationRules(scores, answers);

  const slug =
    Object.entries(adjusted)
      .filter(([, pts]) => pts > -999)
      .sort((a, b) => b[1] - a[1])[0]?.[0] ?? "wellness";

  return { slug, scores: adjusted };
}

export const RITUAL_SUMMARIES: Record<string, { tagline: string; reason: string }> = {
  wellness: {
    tagline: "Votre rituel du matin",
    reason:
      "Idéal pour une routine bien-être quotidienne : digestion, énergie naturelle et vitalité sans excitant.",
  },
  bloom: {
    tagline: "Accompagnement maternité",
    reason:
      "Conçu pour les femmes enceintes et jeunes mamans — doux, nourrissant, saveur crémeuse mangue & coco.",
  },
  period: {
    tagline: "Confort du cycle",
    reason:
      "Formulé pour accompagner le confort pendant le cycle : bissap, mandarine et cannelle en boisson chaude ou fraîche.",
  },
  pulse: {
    tagline: "Énergie & récupération sportive",
    reason:
      "Rituel dynamique au matin ou autour de l'effort — mangue, orange et gingembre pour la vitalité physique. À éviter le soir.",
  },
  calm: {
    tagline: "Rituel du soir",
    reason:
      "Pour une routine apaisante en fin de journée : verveine, camomille et vanille — sans fruit stimulant, idéal avant le sommeil.",
  },
};

/** Explication personnalisée selon les réponses du quiz */
export function getRecommendationReason(
  slug: string,
  answers: Record<string, string>
): string {
  const base = RITUAL_SUMMARIES[slug]?.reason ?? "";
  const moment = answers.moment;
  const need = answers.need;

  if (slug === "calm" && (need === "sleep_calm" || moment === "evening")) {
    return `${base} Vous avez indiqué un besoin de détente ou un rituel du soir — PULSE (orange, mangue, gingembre) n'est pas adapté à ce moment.`;
  }
  if (slug === "pulse" && need === "energy_sport") {
    return `${base} Vous recherchez de l'énergie et une récupération après l'effort — c'est le rituel le plus cohérent pour vous.`;
  }
  return base;
}
