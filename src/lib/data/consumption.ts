export type ConsumptionRating = "excellent" | "good" | "ok" | "avoid";

export interface ConsumptionOption {
  method: string;
  rating: ConsumptionRating;
}

export const UNIVERSAL_PREPARATION = {
  portion: "15–17 g (1 cuillère doseuse)",
  liquid: "200 ml",
  portionsPerPot: "~30 portions",
  steps: [
    "Prenez 1 cuillère doseuse (15–17 g).",
    "Versez 200 ml d'eau chaude ou froide, de lait ou lait végétal.",
    "Mélangez et savourez votre rituel quotidien.",
  ],
};

/** Tous les rituels BOVINIA se dégustent au chaud — et aussi froid selon les envies */
export const HOT_CONSUMPTION_NOTE =
  "Tous nos rituels se préparent à l'eau chaude. Chaque formule peut aussi se déguster fraîche, en smoothie ou avec du lait selon vos préférences.";

export const CONSUMPTION_BY_SLUG: Record<string, ConsumptionOption[]> = {
  wellness: [
    { method: "Eau chaude", rating: "excellent" },
    { method: "Eau fraîche", rating: "excellent" },
    { method: "Lait / lait végétal", rating: "good" },
    { method: "Smoothie", rating: "good" },
  ],
  bloom: [
    { method: "Eau chaude", rating: "excellent" },
    { method: "Lait / lait végétal", rating: "excellent" },
    { method: "Smoothie / milkshake", rating: "excellent" },
    { method: "Eau fraîche", rating: "good" },
  ],
  period: [
    { method: "Eau chaude", rating: "excellent" },
    { method: "Eau fraîche", rating: "excellent" },
    { method: "Boisson tiède", rating: "excellent" },
    { method: "Lait végétal", rating: "good" },
  ],
  pulse: [
    { method: "Eau chaude", rating: "excellent" },
    { method: "Eau fraîche", rating: "excellent" },
    { method: "Smoothie", rating: "excellent" },
    { method: "Avant / après sport", rating: "excellent" },
  ],
  calm: [
    { method: "Eau chaude", rating: "excellent" },
    { method: "Lait chaud / lait végétal", rating: "excellent" },
    { method: "Eau fraîche", rating: "good" },
    { method: "Smoothie", rating: "ok" },
  ],
};

export const RATING_LABELS: Record<ConsumptionRating, string> = {
  excellent: "Excellent",
  good: "Très bien",
  ok: "Possible",
  avoid: "Déconseillé",
};

export const RATING_STARS: Record<ConsumptionRating, number> = {
  excellent: 5,
  good: 4,
  ok: 3,
  avoid: 1,
};
