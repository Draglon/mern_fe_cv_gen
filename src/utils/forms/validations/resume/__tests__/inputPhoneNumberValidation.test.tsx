import { REGEX } from "@/lib/constants/regex";

import { getInputPhoneNumberRules } from "../inputPhoneNumberValidation";

describe("getInputPhoneNumberRules", () => {
  it("returns phone number validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getInputPhoneNumberRules(tShared)).toEqual({
      required: "form.inputPhoneNumber.errors.required",
      pattern: {
        value: REGEX.phoneNumber,
        message: "form.inputPhoneNumber.errors.invalid",
      },
    });
  });
});
