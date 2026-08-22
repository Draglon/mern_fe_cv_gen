export type PersonalLanguagesProps = {
  resumeLocale: string;
  isEdit?: boolean;
};

export type LanguageLevelType = 
  "native"
  | "elementary"
  | "preIntermediate"
  | "intermediate"
  | "upperIntermediate"
  | "advanced"
  | "proficiency"
  | "";

export type LanguageType = {
  language: string;
  level: LanguageLevelType;
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
