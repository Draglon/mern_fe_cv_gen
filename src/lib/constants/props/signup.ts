import { WithLocale } from "@/lib/constants/props/locales";

export type FieldType = {
  userName: string;
  email: string;
  password: string;
};

export type ParamsType = WithLocale<FieldType>;
