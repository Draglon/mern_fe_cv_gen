import { WithLocale } from "@/lib/constants/props/locales";

export type FieldType = {
  newEmail: string;
  password: string;
};

export type ParamsType = WithLocale<FieldType>;