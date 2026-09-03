import { MIN_NIKE_NAME_LENGTH, MAX_NIKE_NAME_LENGTH } from "@/lib/constants";

import { REGEX } from "@/lib/constants/regex";

import { getUserNameRules } from "../userNameValidation";

describe("getUserNameRules", () => {
  it("returns username validation rules", () => {
    const tShared = jest.fn((key: string) => `translated:${key}`);

    const result = getUserNameRules(tShared);

    expect(result).toEqual({
      required: "translated:form.userName.errors.required",

      pattern: {
        value: REGEX.userName,
        message: "translated:form.userName.errors.pattern",
      },

      minLength: {
        value: MIN_NIKE_NAME_LENGTH,
        message: "translated:form.userName.errors.minLength",
      },

      maxLength: {
        value: MAX_NIKE_NAME_LENGTH,
        message: "translated:form.userName.errors.maxLength",
      },
    });

    expect(tShared).toHaveBeenCalledWith("form.userName.errors.minLength", {
      minLength: MIN_NIKE_NAME_LENGTH,
    });

    expect(tShared).toHaveBeenCalledWith("form.userName.errors.maxLength", {
      maxLength: MAX_NIKE_NAME_LENGTH,
    });
  });
});
