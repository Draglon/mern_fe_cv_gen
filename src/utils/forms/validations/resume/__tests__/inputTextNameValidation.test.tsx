import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from "@/lib/constants";

import { getInputTextNameRules } from "../inputTextNameValidation";

describe("getInputTextNameRules", () => {
  it("returns input text name validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getInputTextNameRules(tShared)).toEqual({
      required: "form.inputText.errors.required",

      minLength: {
        value: MIN_NAME_LENGTH,
        message: "form.inputText.errors.minLength",
      },

      maxLength: {
        value: MAX_NAME_LENGTH,
        message: "form.inputText.errors.maxLength",
      },
    });
  });
});
