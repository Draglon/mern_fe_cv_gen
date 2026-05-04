import { Locales } from "@/lib/constants/props/locales";

export type PersonalToolsProps = {
  locale: Locales;
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
  locale: Locales;
};
