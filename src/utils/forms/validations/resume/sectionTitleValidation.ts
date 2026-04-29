import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH } from "@/lib/constants";
import { REGEX_STRING } from "@/lib/constants/regex";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getSectionTitleRules = (tShared:TFunction) => ({
  pattern: {
    value: REGEX_STRING,
    message: tShared("form.sectionTitle.errors.pattern"),
  },
  minLength: {
    value: MIN_INPUT_LENGTH,
    message: tShared("form.sectionTitle.errors.minLength", {
      minLength: MIN_INPUT_LENGTH,
    }),
  },
  maxLength: {
    value: MAX_INPUT_LENGTH,
    message: tShared("form.sectionTitle.errors.maxLength", {
      maxLength: MAX_INPUT_LENGTH,
    }),
  },
});
