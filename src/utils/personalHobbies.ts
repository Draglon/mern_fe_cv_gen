import { Locales } from "@/lib/constants/props/locales";
import { PersonalHobbiesProps } from "@/lib/constants/props/resume";

export const hobbiesByLocale = (personalHobbies: PersonalHobbiesProps, locale: Locales) => JSON.parse(
  personalHobbies?.hobbies[locale] || "[]"
);
