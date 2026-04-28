import { MAX_EMAIL_LENGTH } from "@/lib/constants";
import { REGEX_EMAIL } from "@/lib/constants/regex";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getEmailRules = (tShared:TFunction) => ({
  required: tShared("form.email.errors.required"),
  pattern: {
    value: REGEX_EMAIL,
    message: tShared("form.email.errors.pattern"),
  },
  maxLength: {
    value: MAX_EMAIL_LENGTH,
    message: tShared("form.email.errors.maxLength", {
      maxLength: MAX_EMAIL_LENGTH,
    }),
  },
});
