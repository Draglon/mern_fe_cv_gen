import {
  getInputDatePickerRules,
  getInputEndDateRules,
} from "../inputDatePickerValidation";

describe("getInputDatePickerRules", () => {
  it("returns date picker validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    const result = getInputDatePickerRules(tShared);

    expect(result.required).toEqual({
      value: true,
      message: "form.datePicker.errors.required",
    });

    expect(result.validate.validDate("2024-01-01")).toBe(true);
    expect(result.validate.validDate("invalid-date")).toBe(
      "form.datePicker.errors.invalid"
    );
    expect(result.validate.validDate("")).toBe(true);
  });
});

describe("getInputEndDateRules", () => {
  it("validates end date", () => {
    const tShared = jest.fn((key: string) => key);
    const getValues = jest.fn((path: string) => {
      if (path === "startDate") return "2024-01-01";
      return false;
    });

    const { validate } = getInputEndDateRules({
      tShared,
      getValues,
      startDatePath: "startDate",
      isCurrentPath: "isCurrent",
    });

    expect(validate.validDate("2024-02-01")).toBe(true);
    expect(validate.validDate("invalid-date")).toBe(
      "form.datePicker.errors.invalid"
    );
    expect(validate.validDate("")).toBe(true);

    expect(validate.endDateAfterStart("2024-02-01")).toBe(true);
    expect(validate.endDateAfterStart("2023-12-01")).toBe(
      "form.datePicker.errors.endDateAfterStart"
    );
  });

  it("skips validation for current work", () => {
    const tShared = jest.fn((key: string) => key);
    const getValues = jest.fn(() => true);

    const { validate } = getInputEndDateRules({
      tShared,
      getValues,
      startDatePath: "startDate",
      isCurrentPath: "isCurrent",
    });

    expect(validate.validDate("invalid-date")).toBe(true);
    expect(validate.endDateAfterStart("2020-01-01")).toBe(true);
  });

  it("skips end date comparison when start or end date is missing", () => {
    const tShared = jest.fn((key: string) => key);
    const getValues = jest.fn(() => "");

    const { validate } = getInputEndDateRules({
      tShared,
      getValues,
      startDatePath: "startDate",
    });

    expect(validate.endDateAfterStart("2024-01-01")).toBe(true);
  });

  it("gets current status when isCurrentPath is provided", () => {
    const tShared = jest.fn((key: string) => key);
    const getValues = jest.fn(() => false);

    const { validate } = getInputEndDateRules({
      tShared,
      getValues,
      startDatePath: "startDate",
      isCurrentPath: "isCurrent",
    });

    validate.validDate("2024-01-01");

    expect(getValues).toHaveBeenCalledWith("isCurrent");
  });

  it("gets current status when validating end date order", () => {
    const tShared = jest.fn((key: string) => key);
    const getValues = jest.fn((path: string) => {
      if (path === "isCurrent") return false;

      return "2024-01-01";
    });

    const { validate } = getInputEndDateRules({
      tShared,
      getValues,
      startDatePath: "startDate",
      isCurrentPath: "isCurrent",
    });

    validate.endDateAfterStart("2024-02-01");

    expect(getValues).toHaveBeenCalledWith("isCurrent");
    expect(getValues).toHaveBeenCalledWith("startDate");
  });

  it("uses false when isCurrentPath is not provided", () => {
    const tShared = jest.fn((key: string) => key);
    const getValues = jest.fn();

    const { validate } = getInputEndDateRules({
      tShared,
      getValues,
      startDatePath: "startDate",
    });

    expect(validate.validDate("2024-01-01")).toBe(true);

    expect(getValues).not.toHaveBeenCalled();
  });
});
