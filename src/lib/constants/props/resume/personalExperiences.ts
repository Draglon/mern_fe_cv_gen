import { Control, UseFieldArrayRemove, UseFormGetValues } from "react-hook-form";

export type PersonalExperiencesProps = {
  resumeLocale: string;
  isEdit?: boolean;
};

export type EmploymentType =
  | "fullTime"
  | "partTime"
  | "contract"
  | "internship"
  | "";

export type WorkFormat =
  | "office"
  | "remote"
  | "hybrid"
  | "";

export type ExperienceType = {
  position: string;
  companyName: string;
  location: string;
  employmentType: EmploymentType;
  workFormat: WorkFormat;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  skills: string[];
};

export type FieldType = {
  sectionTitle?: string;
  recentPositionsCount?: number | string;
  experiences: ExperienceType[];
};

export type ParamsType = {
  values: FieldType;
  locale: string;
  resumeLocale: string;
};

export type PersonalExperienceItemProps = {
  index: number,
  control: Control<FieldType>;
  remove: UseFieldArrayRemove;
  getValues: UseFormGetValues<FieldType>;
  resumeLocale: string;
};
