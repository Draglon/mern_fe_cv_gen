import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH } from "@/lib/constants";

import { getInputTextRules } from "../inputTextValidation";

describe("getInputTextRules", () => {
  it("returns input text validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getInputTextRules(tShared)).toEqual({
      required: "form.inputText.errors.required",

      minLength: {
        value: MIN_INPUT_LENGTH,
        message: "form.inputText.errors.minLength",
      },

      maxLength: {
        value: MAX_INPUT_LENGTH,
        message: "form.inputText.errors.maxLength",
      },
    });
  });
});
