import { WithLocale } from "@/lib/constants/props/locales";

export type FieldType = {
  email: string;
  password: string;
};

export type ParamsType = WithLocale<FieldType>;