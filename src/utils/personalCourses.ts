import { Locales, Locale } from "@/lib/constants/props/locales";

type PersonalCoursesProps = {
  sectionTitle?: string;
  courses: Locale;
};

export const coursesByLocale = (personalCourses: PersonalCoursesProps, locale: Locales) => JSON.parse(
  personalCourses?.courses[locale] || "[]"
);