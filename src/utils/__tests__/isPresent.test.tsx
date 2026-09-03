import isPresent from "../isPresent";

describe("isPresent", () => {
  it("returns false for null", () => {
    expect(isPresent(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isPresent(undefined)).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isPresent("")).toBe(false);
  });

  it("returns false for an empty array", () => {
    expect(isPresent([])).toBe(false);
  });

  it("returns false for an empty object", () => {
    expect(isPresent({})).toBe(false);
  });

  it("returns true for a non-empty string", () => {
    expect(isPresent("value")).toBe(true);
  });

  it("returns true for a non-empty array", () => {
    expect(isPresent(["value"])).toBe(true);
  });

  it("returns true for a non-empty object", () => {
    expect(isPresent({ key: "value" })).toBe(true);
  });

  it("returns true for a number", () => {
    expect(isPresent(0)).toBe(true);
  });

  it("returns true for a boolean", () => {
    expect(isPresent(false)).toBe(true);
  });
});
