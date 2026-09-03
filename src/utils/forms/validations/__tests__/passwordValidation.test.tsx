import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "@/lib/constants";

import {
  getPasswordRules,
  getConfirmPasswordRules,
} from "../passwordValidation";

describe("getPasswordRules", () => {
  const tShared = jest.fn((key: string) => `translated:${key}`);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns password validation rules", () => {
    const result = getPasswordRules(tShared);

    expect(result).toEqual({
      required: "translated:form.password.errors.required",

      minLength: {
        value: MIN_PASSWORD_LENGTH,
        message: "translated:form.password.errors.minLength",
      },

      maxLength: {
        value: MAX_PASSWORD_LENGTH,
        message: "translated:form.password.errors.maxLength",
      },

      validate: {
        hasUppercase: expect.any(Function),
        hasNumber: expect.any(Function),
      },
    });

    expect(tShared).toHaveBeenCalledWith("form.password.errors.minLength", {
      minLength: MIN_PASSWORD_LENGTH,
    });

    expect(tShared).toHaveBeenCalledWith("form.password.errors.maxLength", {
      maxLength: MAX_PASSWORD_LENGTH,
    });
  });

  it("validates uppercase letters and numbers", () => {
    const { validate } = getPasswordRules(tShared);

    expect(validate.hasUppercase("Password")).toBe(true);
    expect(validate.hasUppercase("123456")).toBe(
      "translated:form.password.errors.uppercase"
    );

    expect(validate.hasNumber("Password1")).toBe(true);
    expect(validate.hasNumber("Password")).toBe(
      "translated:form.password.errors.number"
    );
  });
});

describe("getConfirmPasswordRules", () => {
  const t = jest.fn((key: string) => `translated:${key}`);
  const getValues = jest.fn();
  const trigger = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns confirm password validation rules", () => {
    const result = getConfirmPasswordRules({
      t,
      getValues,
      trigger,
    });

    expect(result.required).toBe(
      "translated:changePassword.form.password.errors.required"
    );

    expect(result.validate.matchPasswords).toEqual(expect.any(Function));
    expect(result.onChange).toEqual(expect.any(Function));
  });

  it("validates that passwords match", () => {
    const { matchPasswords } = getConfirmPasswordRules({
      t,
      getValues,
      trigger,
    }).validate;

    getValues.mockReturnValue("Password123");

    expect(matchPasswords("Password123")).toBe(true);

    expect(matchPasswords("Password456")).toBe(
      "translated:changePassword.form.password.errors.confirmPassword"
    );

    expect(getValues).toHaveBeenCalledWith("newPassword");
  });

  it("triggers confirm password validation on change", () => {
    const { onChange } = getConfirmPasswordRules({
      t,
      getValues,
      trigger,
    });

    onChange();

    expect(trigger).toHaveBeenCalledWith("confirmPassword");
  });
});
