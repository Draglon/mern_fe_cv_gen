export type PersonalSkillsProps = {
  resumeLocale: string;
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
  locale: string;
  resumeLocale: string;
};
