import { MIN_NAME_LENGTH, MAX_TEXTAREA_CONTENT_NORMAL_LENGTH } from "@/lib/constants";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getTextareaRules = (tShared:TFunction) => ({
  required: tShared("form.textarea.errors.required"),
  minLength: {
    value: MIN_NAME_LENGTH,
    message: tShared("form.textarea.errors.minLength", {
      minLength: MIN_NAME_LENGTH,
    }),
  },
  maxLength: {
    value: MAX_TEXTAREA_CONTENT_NORMAL_LENGTH,
    message: tShared("form.textarea.errors.maxLength", {
      maxLength: MAX_TEXTAREA_CONTENT_NORMAL_LENGTH,
    }),
  },
});
