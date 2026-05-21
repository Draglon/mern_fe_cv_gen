import { WithLocale } from "@/lib/constants/props/locales";

export type FieldType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ParamsType = WithLocale<Omit<FieldType, "confirmPassword">>;