export type PersonalEducationProps = {
  resumeLocale: string;
  isEdit?: boolean;
};

export type EducationType = {
    institute: string;
    degree: string;
    faculty: string;
    specialization: string;
    startDate: string;
    endDate: string;
    isCurrent: false;
  };

export type FieldType = {
  sectionTitle: string;
  education: EducationType[];
};

export type ParamsType = {
  values: FieldType;
  locale: string;
  resumeLocale: string;
};
