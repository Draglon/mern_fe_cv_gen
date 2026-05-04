import { Locales } from "@/lib/constants/props/locales";

export type PersonalEducationProps = {
  locale: Locales;
  isEdit?: boolean;
};

export type EducationType = {
    institute: string;
    degree: string;
    faculty: string;
    specialization: string;
    startDate: string;
    endDate: string;
  };

export type FieldType = {
  sectionTitle: string;
  education: EducationType[];
};

export type ParamsType = {
  values: FieldType;
  locale: Locales;
};
