import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalEducationProps = {
  education: Locale;
};

export const educationByLocale = (personalEducation: PersonalEducationProps, locale: Locales) => JSON.parse(
  personalEducation?.education[locale as Locales] || "[]"
);