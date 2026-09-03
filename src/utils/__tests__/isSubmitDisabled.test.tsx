import isSubmitDisabled from "../isSubmitDisabled";

describe("isSubmitDisabled", () => {
  it("returns true when form is submitting", () => {
    expect(
      isSubmitDisabled({
        isSubmitting: true,
        isDirty: true,
      })
    ).toBe(true);
  });

  it("returns true when form is not dirty", () => {
    expect(
      isSubmitDisabled({
        isSubmitting: false,
        isDirty: false,
      })
    ).toBe(true);
  });

  it("returns true when form is submitting and not dirty", () => {
    expect(
      isSubmitDisabled({
        isSubmitting: true,
        isDirty: false,
      })
    ).toBe(true);
  });

  it("returns false when form is not submitting and is dirty", () => {
    expect(
      isSubmitDisabled({
        isSubmitting: false,
        isDirty: true,
      })
    ).toBe(false);
  });
});
