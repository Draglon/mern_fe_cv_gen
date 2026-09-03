import {
  MIN_NAME_LENGTH,
  MAX_TEXTAREA_CONTENT_NORMAL_LENGTH,
} from "@/lib/constants";

import { getTextareaRules } from "../textareaValidation";

describe("getTextareaRules", () => {
  it("returns textarea validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getTextareaRules(tShared)).toEqual({
      required: "form.textarea.errors.required",

      minLength: {
        value: MIN_NAME_LENGTH,
        message: "form.textarea.errors.minLength",
      },

      maxLength: {
        value: MAX_TEXTAREA_CONTENT_NORMAL_LENGTH,
        message: "form.textarea.errors.maxLength",
      },
    });
  });
});
