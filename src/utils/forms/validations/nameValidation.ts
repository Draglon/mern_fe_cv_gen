import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from "@/lib/constants";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getNameRules = (t:TFunction) => ({
  minLength: {
    value: MIN_NAME_LENGTH,
    message: t("form.name.errors.minLength", {
      minLength: MIN_NAME_LENGTH,
    }),
  },
  maxLength: {
    value: MAX_NAME_LENGTH,
    message: t("form.name.errors.maxLength", {
      maxLength: MAX_NAME_LENGTH,
    }),
  },
});
