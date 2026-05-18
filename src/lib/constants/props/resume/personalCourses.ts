export type PersonalCoursesProps = {
  resumeLocale: string;
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
  locale: string;
  resumeLocale: string;
};
