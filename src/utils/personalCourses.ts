import { Locales } from "@/lib/constants/props/locales";
import { PersonalCoursesProps } from "@/lib/constants/props/resume";

export const coursesByLocale = (personalCourses: PersonalCoursesProps, locale: Locales) => JSON.parse(
  personalCourses?.courses[locale] || "[]"
);