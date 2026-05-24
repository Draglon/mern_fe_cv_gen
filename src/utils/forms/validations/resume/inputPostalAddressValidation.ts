import { MIN_INPUT_POSTAL_ADDRESS_LENGTH, MAX_INPUT_POSTAL_ADDRESS_LENGTH } from "@/lib/constants";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getInputPostalAddressRules = (tShared:TFunction) => ({
  required: tShared("form.inputText.errors.required"),
  minLength: {
    value: MIN_INPUT_POSTAL_ADDRESS_LENGTH,
    message: tShared("form.inputText.errors.minLength", {
      minLength: MIN_INPUT_POSTAL_ADDRESS_LENGTH,
    }),
  },
  maxLength: {
    value: MAX_INPUT_POSTAL_ADDRESS_LENGTH,
    message: tShared("form.inputText.errors.maxLength", {
      maxLength: MAX_INPUT_POSTAL_ADDRESS_LENGTH,
    }),
  },
});
