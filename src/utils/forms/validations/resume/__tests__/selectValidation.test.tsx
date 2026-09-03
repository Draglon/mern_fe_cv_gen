import { LANGUAGE_LEVEL } from "@/lib/constants/languages";

import { getSelectRules, getSelectLanguageRules } from "../selectValidation";

describe("getSelectRules", () => {
  it("returns required validation rule", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getSelectRules(tShared)).toEqual({
      required: "form.select.errors.required",
    });
  });
});

describe("getSelectLanguageRules", () => {
  it("returns required validation rule", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getSelectLanguageRules(tShared)).toEqual({
      required: "form.languageLevel.errors.required",
      validate: expect.any(Function),
    });
  });

  it("validates language level", () => {
    const tShared = jest.fn((key: string) => key);

    const { validate } = getSelectLanguageRules(tShared);

    expect(validate("intermediate")).toBe(true);

    expect(validate("invalidLevel")).toBe(
      "form.languageLevel.errors.invalidLanguageLevel"
    );

    expect(LANGUAGE_LEVEL).toContain("intermediate");
  });
});
