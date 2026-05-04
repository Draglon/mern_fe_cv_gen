import { Locales } from "@/lib/constants/props/locales";

export type PersonalHobbiesProps = {
  locale: Locales;
  isEdit?: boolean;
};

export type HobbyType = {
  hobby: string;
};

export type FieldType = {
  sectionTitle: string;
  hobbies: HobbyType[];
};

export type ParamsType = {
  values: FieldType;
  locale: Locales;
};
