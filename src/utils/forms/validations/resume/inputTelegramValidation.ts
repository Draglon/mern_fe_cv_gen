import { REGEX } from "@/lib/constants/regex";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getInputTelegramRules = (tShared: TFunction) => ({
  pattern: {
    value: REGEX.telegram,
    message: tShared("form.inputTelegram.errors.pattern"),
  },
});
