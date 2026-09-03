import { Locales } from "@/lib/constants/props/locales";
import { PersonalSkillsProps } from "@/lib/constants/props/resume";

export const skillsByLocale = (locale: Locales, personalSkills?: PersonalSkillsProps) =>
  personalSkills?.skills[locale] || [];
