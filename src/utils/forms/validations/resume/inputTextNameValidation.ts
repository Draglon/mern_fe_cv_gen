import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from "@/lib/constants";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getInputTextNameRules = (tShared:TFunction) => ({
  required: tShared("form.inputText.errors.required"),
  minLength: {
    value: MIN_NAME_LENGTH,
    message: tShared("form.inputText.errors.minLength", {
      minLength: MIN_NAME_LENGTH,
    }),
  },
  maxLength: {
    value: MAX_NAME_LENGTH,
    message: tShared("form.inputText.errors.maxLength", {
      maxLength: MAX_NAME_LENGTH,
    }),
  },
});
