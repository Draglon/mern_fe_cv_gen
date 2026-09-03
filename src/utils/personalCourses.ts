import { Locales } from "@/lib/constants/props/locales";
import { PersonalCoursesProps } from "@/lib/constants/props/resume";

export const coursesByLocale = (locale: Locales, personalCourses?: PersonalCoursesProps) =>
  personalCourses?.courses[locale] || [];