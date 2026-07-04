export type Locale = "fr" | "en";

export const defaultLocale: Locale = "fr";
export const locales: Locale[] = ["fr", "en"];

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

// i18n architecture ready — add [locale] route segment and dictionaries when English is needed.
// Example: src/app/[locale]/(public)/page.tsx with next-intl or custom dictionaries.

export const dictionaries = {
  fr: {
    nav: {
      products: "Nos rituels",
      story: "Notre histoire",
      horizon: "Horizon Farm",
      blog: "Conseils",
      contact: "Contact",
      preorder: "Précommander",
    },
  },
  en: {
    nav: {
      products: "Our rituals",
      story: "Our story",
      horizon: "Horizon Farm",
      blog: "Tips",
      contact: "Contact",
      preorder: "Pre-order",
    },
  },
} as const;
