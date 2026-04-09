import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalLanguagesProps = {
  sectionTitle?: string;
  languages: Locale;
};

export const languagesByLocale = (personalLanguages: PersonalLanguagesProps, locale: Locales) => JSON.parse(
  personalLanguages?.languages[locale] || "[]"
);
