export type PersonalExperiencesProps = {
  resumeLocale: string;
  isEdit?: boolean;
};

export type ExperienceType = {
  position: string;
  companyName: string;
  location: string;
  employmentType: "fullTime" | "partTime" | "contract" | "internship";
  workFormat: "office" | "remote" | "hybrid";
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
