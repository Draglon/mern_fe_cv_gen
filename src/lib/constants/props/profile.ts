import { WithLocale } from "@/lib/constants/props/locales";

export type FieldType = {
  avatarUrl: string[];
  firstName: string;
  lastName: string;
  userName: string;
};

export type ParamsType = WithLocale<FieldType>;