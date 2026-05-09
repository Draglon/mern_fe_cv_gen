import type { UseFormGetValues, UseFormTrigger } from "react-hook-form";

import { FieldType } from "@/lib/constants/props/settings/changePassword";
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "@/lib/constants";
import { REGEX } from "@/lib/constants/regex";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getPasswordRules = (tShared:TFunction) => ({
  required: tShared("form.password.errors.required"),

  minLength: {
    value: MIN_PASSWORD_LENGTH,
    message: tShared("form.password.errors.minLength", {
      minLength: MIN_PASSWORD_LENGTH,
    }),
  },

  maxLength: {
    value: MAX_PASSWORD_LENGTH,
    message: tShared("form.password.errors.maxLength", {
      maxLength: MAX_PASSWORD_LENGTH,
    }),
  },

  validate: {
    hasUppercase: (value: string) =>
      REGEX.hasLetters.test(value) ||
      tShared("form.password.errors.uppercase"),

    hasNumber: (value: string) =>
      REGEX.hasDigits.test(value) ||
      tShared("form.password.errors.number"),
  },
});

type ConfirmPasswordRulesType = {
  t: TFunction;
  getValues: UseFormGetValues<FieldType>;
  trigger: UseFormTrigger<FieldType>;
}; 

export const getConfirmPasswordRules = ({
  t,
  getValues,
  trigger,
}: ConfirmPasswordRulesType) => ({
  required: t("changePassword.form.password.errors.required"),

  validate: {
    matchPasswords: (value: string) =>
      value === getValues("newPassword") ||
      t("changePassword.form.password.errors.confirmPassword"),
  },

  onChange: () => {
    trigger("confirmPassword");
  },
});
