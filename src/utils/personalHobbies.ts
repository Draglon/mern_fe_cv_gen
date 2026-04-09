import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalHobbiesProps = {
  sectionTitle?: string;
  hobbies: Locale;
};

export const hobbiesByLocale = (personalHobbies: PersonalHobbiesProps, locale: Locales) => JSON.parse(
  personalHobbies?.hobbies[locale] || "[]"
);
