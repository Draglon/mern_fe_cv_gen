import isSubmitLoading from "../isSubmitLoading";

describe("isSubmitLoading", () => {
  it("returns true when isSubmitting is true", () => {
    expect(isSubmitLoading({ isSubmitting: true })).toBe(true);
  });

  it("returns false when isSubmitting is false", () => {
    expect(isSubmitLoading({ isSubmitting: false })).toBe(false);
  });
});
