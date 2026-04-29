import { Omit } from "node_modules/cypress/types/lodash";

export type FieldType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ParamsType = Omit<FieldType, "confirmPassword">;