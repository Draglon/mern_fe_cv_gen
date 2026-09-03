import isDeepEmpty from "../isDeepEmpty";

describe("isDeepEmpty", () => {
  it("returns true when all values are empty", () => {
    expect(
      isDeepEmpty({
        firstName: "",
        lastName: "",
        email: "",
      })
    ).toBe(true);
  });

  it("returns true for an empty object", () => {
    expect(isDeepEmpty({})).toBe(true);
  });

  it("returns false when at least one value is not empty", () => {
    expect(
      isDeepEmpty({
        firstName: "John",
        lastName: "",
        email: "",
      })
    ).toBe(false);
  });

  it("returns false when multiple values are not empty", () => {
    expect(
      isDeepEmpty({
        firstName: "John",
        lastName: "Doe",
        email: "",
      })
    ).toBe(false);
  });
});
