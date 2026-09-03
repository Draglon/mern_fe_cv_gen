import { REGEX } from "@/lib/constants/regex";

import { getInputTelegramRules } from "../inputTelegramValidation";

describe("getInputTelegramRules", () => {
  it("returns telegram validation rules", () => {
    const tShared = jest.fn((key: string) => key);

    expect(getInputTelegramRules(tShared)).toEqual({
      pattern: {
        value: REGEX.telegram,
        message: "form.inputTelegram.errors.pattern",
      },
    });
  });
});
