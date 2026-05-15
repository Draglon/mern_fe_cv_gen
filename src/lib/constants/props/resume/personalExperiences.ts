import { Locales } from "@/lib/constants/props/locales";

export type PersonalExperiencesProps = {
  locale: Locales;
  isEdit?: boolean;
};

export type ExperienceType = {
  position: string;
  companyName: string;
  location: string;
  employmentType: string;
  workFormat: string;
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
  locale: Locales;
};
