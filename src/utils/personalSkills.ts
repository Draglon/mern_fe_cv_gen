import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalSkillsProps = {
  skills: Locale;
};

export const skillsByLocale = (personalSkills: PersonalSkillsProps, locale: Locales) => JSON.parse(
  personalSkills?.skills[locale as Locales] || "[]"
);
