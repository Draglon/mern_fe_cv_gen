import { MAX_EMAIL_LENGTH } from "@/lib/constants";
import { REGEX } from "@/lib/constants/regex";

import { getEmailRules } from "../emailValidation";

describe("getEmailRules", () => {
  it("returns email validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getEmailRules(tShared)).toEqual({
      required: "form.email.errors.required",
      pattern: {
        value: REGEX.email,
        message: "form.email.errors.pattern",
      },
      maxLength: {
        value: MAX_EMAIL_LENGTH,
        message: "form.email.errors.maxLength",
      },
    });
  });
});
