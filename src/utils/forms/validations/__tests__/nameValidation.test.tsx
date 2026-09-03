import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from "@/lib/constants";
import { REGEX } from "@/lib/constants/regex";

import { getNameRules } from "../nameValidation";

describe("getNameRules", () => {
  it("returns first name validation rules", () => {
    const tShared = jest.fn((key: string) => `translated:${key}`);

    const result = getNameRules(tShared, "firstName");

    expect(result).toEqual({
      pattern: {
        value: REGEX.name,
        message: "translated:form.firstName.errors.pattern",
      },
      minLength: {
        value: MIN_NAME_LENGTH,
        message: "translated:form.firstName.errors.minLength",
      },
      maxLength: {
        value: MAX_NAME_LENGTH,
        message: "translated:form.firstName.errors.maxLength",
      },
    });

    expect(tShared).toHaveBeenCalledWith("form.firstName.errors.minLength", {
      minLength: MIN_NAME_LENGTH,
    });

    expect(tShared).toHaveBeenCalledWith("form.firstName.errors.maxLength", {
      maxLength: MAX_NAME_LENGTH,
    });
  });

  it("uses lastName field in translation keys", () => {
    const tShared = jest.fn((key: string) => `translated:${key}`);

    const result = getNameRules(tShared, "lastName");

    expect(result.pattern.message).toBe(
      "translated:form.lastName.errors.pattern"
    );

    expect(result.minLength.message).toBe(
      "translated:form.lastName.errors.minLength"
    );

    expect(result.maxLength.message).toBe(
      "translated:form.lastName.errors.maxLength"
    );
  });
});
