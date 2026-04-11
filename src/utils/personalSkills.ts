import { Locales } from "@/lib/constants/props/locales";
import { PersonalSkillsProps } from "@/lib/constants/props/resume";

export const skillsByLocale = (personalSkills: PersonalSkillsProps, locale: Locales) => JSON.parse(
  personalSkills?.skills[locale] || "[]"
);
