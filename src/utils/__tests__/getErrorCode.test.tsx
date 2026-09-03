import { HTTP_CODES } from "@/lib/constants";

import {
  errorCode,
  isErrorCodeIncorrectCurrentPassword,
  isErrorCodeNewPasswordEqualsOld,
} from "../getErrorCode";

const createError = (code: string) => ({
  response: {
    data: {
      code,
    },
  },
});

describe("errorCode", () => {
  it("returns error code", () => {
    const error = createError(HTTP_CODES.incorrectCurrentPassword);

    expect(errorCode(error)).toBe(HTTP_CODES.incorrectCurrentPassword);
  });

  it("returns undefined when error code is absent", () => {
    expect(errorCode({})).toBeUndefined();
  });
});

describe("error code helpers", () => {
  it("returns true for incorrect current password", () => {
    expect(
      isErrorCodeIncorrectCurrentPassword(
        createError(HTTP_CODES.incorrectCurrentPassword)
      )
    ).toBe(true);
  });

  it("returns true for new password equals old", () => {
    expect(
      isErrorCodeNewPasswordEqualsOld(
        createError(HTTP_CODES.newPasswordEqualsOld)
      )
    ).toBe(true);
  });

  it("returns false for different error code", () => {
    const error = createError("some-other-code");

    expect(isErrorCodeIncorrectCurrentPassword(error)).toBe(false);
    expect(isErrorCodeNewPasswordEqualsOld(error)).toBe(false);
  });
});
