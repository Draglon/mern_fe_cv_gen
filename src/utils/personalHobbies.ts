import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalHobbiesProps = {
  hobbies: Locale;
};

export const hobbiesByLocale = (personalHobbies: PersonalHobbiesProps, locale: Locales) => JSON.parse(
  personalHobbies?.hobbies[locale as Locales] || "[]"
);
