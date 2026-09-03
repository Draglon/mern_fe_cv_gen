import initials from "../initials";

describe("initials", () => {
  it("returns an empty string when value is undefined", () => {
    expect(initials()).toBe("");
  });

  it("returns the first letter for a single word", () => {
    expect(initials("John")).toBe("J");
  });

  it("returns the first letters of two words", () => {
    expect(initials("John Doe")).toBe("JD");
  });

  it("returns only the first two initials for more than two words", () => {
    expect(initials("John Michael Doe")).toBe("JM");
  });

  it("converts initials to uppercase", () => {
    expect(initials("john doe")).toBe("JD");
  });

  it("handles multiple spaces between words", () => {
    expect(initials("John  Doe")).toBe("JD");
  });

  it("handles an empty string", () => {
    expect(initials("")).toBe("");
  });
});
