import { LANGUAGE_LEVEL, LanguageLevel } from "@/lib/constants/languages";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getSelectRules = (tShared:TFunction) => ({
  required: tShared("form.select.errors.required"),
});

export const getSelectLanguageRules = (tShared:TFunction) => ({
  required: tShared("form.languageLevel.errors.required"),
  validate: (value: string) =>
    LANGUAGE_LEVEL.includes(value as LanguageLevel) ||
    tShared("form.languageLevel.errors.invalidLanguageLevel"),
});
