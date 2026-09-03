import {
  MIN_LEVEL_NUMBER,
  MAX_LEVEL_NUMBER,
  MIN_NUMBER,
} from "@/lib/constants";

import {
  getInputNumberLevelRules,
  getInputNumberRecentPositionsCountRules,
} from "../inputNumberValidation";

describe("getInputNumberLevelRules", () => {
  it("returns number level validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getInputNumberLevelRules(tShared)).toEqual({
      required: "form.inputText.errors.required",
      valueAsNumber: true,
      min: {
        value: MIN_LEVEL_NUMBER,
        message: "form.inputNumber.errors.minNumber",
      },
      max: {
        value: MAX_LEVEL_NUMBER,
        message: "form.inputNumber.errors.maxNumber",
      },
    });
  });
});

describe("getInputNumberRecentPositionsCountRules", () => {
  it("returns recent positions count validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getInputNumberRecentPositionsCountRules(tShared)).toEqual({
      valueAsNumber: true,
      min: {
        value: MIN_NUMBER,
        message: "form.inputNumber.errors.minNumber",
      },
    });
  });
});
