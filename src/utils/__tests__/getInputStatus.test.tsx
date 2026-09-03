import getInputStatus from "../getInputStatus";

describe("getInputStatus", () => {
  it('returns "error" when errors are present', () => {
    expect(
      getInputStatus({
        errors: {
          type: "required",
          message: "Field is required",
        },
      })
    ).toBe("error");
  });

  it("returns status when errors are not present", () => {
    expect(
      getInputStatus({
        status: "success",
      })
    ).toBe("success");
  });

  it("returns undefined when errors and status are not provided", () => {
    expect(getInputStatus({})).toBeUndefined();
  });

  it("returns undefined when errors are not present and status is undefined", () => {
    expect(
      getInputStatus({
        errors: undefined,
        status: undefined,
      })
    ).toBeUndefined();
  });
});
