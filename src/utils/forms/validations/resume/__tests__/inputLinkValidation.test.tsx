import { getInputLinkRules } from "../inputLinkValidation";

describe("getInputLinkRules", () => {
  it("returns link validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getInputLinkRules(tShared)).toEqual({
      validate: expect.any(Function),
    });
  });

  it("validates link value", () => {
    const tShared = jest.fn((key: string) => key);
    const { validate } = getInputLinkRules(tShared);

    expect(validate()).toBe(true);
    expect(validate("")).toBe(true);
    expect(validate("https://example.com")).toBe(true);
    expect(validate("invalid-url")).toBe("form.inputLink.errors.invalid");
  });
});
