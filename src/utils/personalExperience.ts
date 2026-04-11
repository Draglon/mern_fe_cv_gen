import { Locales } from "@/lib/constants/props/locales";
import { PersonalExperienceProps } from "@/lib/constants/props/resume";

export const experienceByLocale = (personalExperience: PersonalExperienceProps, locale: Locales) => JSON.parse(
  personalExperience?.experience[locale] || "[]"
);