import { MIN_NIKE_NAME_LENGTH, MAX_NIKE_NAME_LENGTH } from "@/lib/constants";
import { REGEX_NICK_NAME } from "@/lib/constants/regex";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getUserNameRules = (tShared:TFunction) => ({
  required: tShared("form.userName.errors.required"),
  pattern: {
    value: REGEX_NICK_NAME,
    message: tShared("form.userName.errors.pattern"),
  },
  minLength: {
    value: MIN_NIKE_NAME_LENGTH,
    message: tShared("form.userName.errors.minLength", {
      minLength: MIN_NIKE_NAME_LENGTH,
    }),
  },
  maxLength: {
    value: MAX_NIKE_NAME_LENGTH,
    message: tShared("form.userName.errors.maxLength", {
      maxLength: MAX_NIKE_NAME_LENGTH,
    }),
  },
});
