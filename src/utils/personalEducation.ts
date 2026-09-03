import { Locales } from "@/lib/constants/props/locales";
import { PersonalEducationProps } from "@/lib/constants/props/resume";

export const educationByLocale = (locale: Locales, personalEducation?: PersonalEducationProps) =>
  personalEducation?.education[locale] || [];