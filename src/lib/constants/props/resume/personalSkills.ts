import { Locales } from "@/lib/constants/props/locales";

export type PersonalSkillsProps = {
  locale: Locales;
  isEdit?: boolean;
};

export type SkillType = {
  skill: string;
  level: string;
  visible: boolean;
};

export type FieldType = {
  sectionTitle?: string;
  skills: SkillType[];
};

export type ParamsType = {
  values: FieldType;
  locale: Locales;
};
