export type PersonalLanguagesProps = {
  resumeLocale: string;
  isEdit?: boolean;
};

export type LanguageType = {
  language: string;
  level: string;
};

export type FieldType = {
  sectionTitle: string;
  languages: LanguageType[];
};

export type ParamsType = {
  values: FieldType;
  locale: string;
  resumeLocale: string;
};
