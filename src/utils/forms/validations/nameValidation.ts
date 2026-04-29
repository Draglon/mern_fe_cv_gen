import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from "@/lib/constants";
import { REGEX_NAME } from "@/lib/constants/regex";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getNameRules = (tShared:TFunction, field: "firstName" | "lastName") => ({
  pattern: {
    value: REGEX_NAME,
    message: tShared(`form.${field}.errors.pattern`),
  },
  minLength: {
    value: MIN_NAME_LENGTH,
    message: tShared(`form.${field}.errors.minLength`, {
      minLength: MIN_NAME_LENGTH,
    }),
  },
  maxLength: {
    value: MAX_NAME_LENGTH,
    message: tShared(`form.${field}.errors.maxLength`, {
      maxLength: MAX_NAME_LENGTH,
    }),
  },
});
