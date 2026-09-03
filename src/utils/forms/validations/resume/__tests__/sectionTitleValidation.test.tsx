import { MIN_INPUT_LENGTH, MAX_INPUT_LENGTH } from "@/lib/constants";

import { REGEX } from "@/lib/constants/regex";

import { getSectionTitleRules } from "../sectionTitleValidation";

describe("getSectionTitleRules", () => {
  it("returns section title validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getSectionTitleRules(tShared)).toEqual({
      pattern: {
        value: REGEX.string,
        message: "form.sectionTitle.errors.pattern",
      },

      minLength: {
        value: MIN_INPUT_LENGTH,
        message: "form.sectionTitle.errors.minLength",
      },

      maxLength: {
        value: MAX_INPUT_LENGTH,
        message: "form.sectionTitle.errors.maxLength",
      },
    });
  });
});
