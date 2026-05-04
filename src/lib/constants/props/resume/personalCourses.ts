import { Locales } from "@/lib/constants/props/locales";

export type PersonalCoursesProps = {
  locale: Locales;
  isEdit?: boolean;
};

export type CourseType = {
  course: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type FieldType = {
  sectionTitle: string;
  courses: CourseType[];
};

export type ParamsType = {
  values: FieldType;
  locale: Locales;
};
