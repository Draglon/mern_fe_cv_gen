import { MIN_LEVEL_NUMBER, MAX_LEVEL_NUMBER, MIN_NUMBER } from "@/lib/constants";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getInputNumberLevelRules = (tShared:TFunction) => ({
  required: tShared("form.inputText.errors.required"),
  valueAsNumber: true,
  min: {
    value: MIN_LEVEL_NUMBER,
    message: tShared("form.inputNumber.errors.minNumber", {
      minNumber: MIN_LEVEL_NUMBER,
    }),
  },
  max: {
    value: MAX_LEVEL_NUMBER,
    message: tShared("form.inputNumber.errors.maxNumber", {
      maxNumber: MAX_LEVEL_NUMBER,
    }),
  },
});

export const getInputNumberRecentPositionsCountRules = (tShared:TFunction) => ({
  valueAsNumber: true,
  min: {
    value: MIN_NUMBER,
    message: tShared("form.inputNumber.errors.minNumber", {
      minNumber: MIN_NUMBER,
    }),
  },
});
