import { WithLocale } from "@/lib/constants/props/locales";

export type FieldType = {
  userName: string;
};

export type ParamsType = WithLocale<FieldType>;