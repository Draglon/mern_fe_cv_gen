import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalEducationProps = {
  sectionTitle?: string;
  education: Locale;
};

export const educationByLocale = (personalEducation: PersonalEducationProps, locale: Locales) => JSON.parse(
  personalEducation?.education[locale] || "[]"
);