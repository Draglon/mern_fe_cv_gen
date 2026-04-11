import { Locales } from "@/lib/constants/props/locales";
import { PersonalEducationProps } from "@/lib/constants/props/resume";

export const educationByLocale = (personalEducation: PersonalEducationProps, locale: Locales) => JSON.parse(
  personalEducation?.education[locale] || "[]"
);