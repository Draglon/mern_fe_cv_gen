import { REGEX } from "@/lib/constants/regex";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getInputPhoneNumberRules = (tShared: TFunction) => ({
  required: tShared("form.inputPhoneNumber.errors.required"),
  pattern: {
    value: REGEX.phoneNumber,
    message: tShared("form.inputPhoneNumber.errors.invalid"),
  },
});
