export type PersonalToolsProps = {
  resumeLocale: string;
  isEdit?: boolean;
};

export type ToolType = {
  tool: string;
  level: string;
  visible: boolean;
};

export type FieldType = {
  sectionTitle?: string;
  tools: ToolType[];
};

export type ParamsType = {
  values: FieldType;
  locale: string;
  resumeLocale: string;
};
