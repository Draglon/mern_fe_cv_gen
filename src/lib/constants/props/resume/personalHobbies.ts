import { Locales } from "@/lib/constants/props/locales";

export type PersonalHobbiesProps = {
  locale: Locales;
  isEdit?: boolean;
};

export type FieldType = {
  sectionTitle: string;
  hobbies: { hobby: string }[];
};

export type ParamsType = {
  values: FieldType;
  locale: Locales;
};
