import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalExperienceProps = {
  sectionTitle: Locale;
  experience: Locale;
};

export const experienceByLocale = (personalExperience: PersonalExperienceProps, locale: Locales) => JSON.parse(
  personalExperience?.experience[locale] || "[]"
);