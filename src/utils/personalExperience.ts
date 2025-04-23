import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalExperienceProps = {
  experience: Locale;
};

export const experienceByLocale = (personalExperience: PersonalExperienceProps, locale: Locales) => JSON.parse(
  personalExperience?.experience[locale as Locales] || "[]"
);