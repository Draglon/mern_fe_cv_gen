import {
  MIN_INPUT_POSTAL_ADDRESS_LENGTH,
  MAX_INPUT_POSTAL_ADDRESS_LENGTH,
} from "@/lib/constants";

import { getInputPostalAddressRules } from "../inputPostalAddressValidation";

describe("getInputPostalAddressRules", () => {
  it("returns postal address validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getInputPostalAddressRules(tShared)).toEqual({
      required: "form.inputText.errors.required",

      minLength: {
        value: MIN_INPUT_POSTAL_ADDRESS_LENGTH,
        message: "form.inputText.errors.minLength",
      },

      maxLength: {
        value: MAX_INPUT_POSTAL_ADDRESS_LENGTH,
        message: "form.inputText.errors.maxLength",
      },
    });
  });
});
