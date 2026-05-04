import { Locales } from "@/lib/constants/props/locales";

export type PersonalLanguagesProps = {
  locale: Locales;
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
  locale: Locales;
};
