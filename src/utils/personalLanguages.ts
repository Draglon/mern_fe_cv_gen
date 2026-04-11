import { Locales } from "@/lib/constants/props/locales";
import { PersonalLanguagesProps } from "@/lib/constants/props/resume";

export const languagesByLocale = (personalLanguages: PersonalLanguagesProps, locale: Locales) => JSON.parse(
  personalLanguages?.languages[locale] || "[]"
);
