import { HTTP_STATUSES } from "@/lib/constants";

import {
  errorStatus,
  isErrorStatusIncorrectData,
  isErrorStatusUnauthorized,
  isErrorStatusForbidden,
  isErrorStatusNotFound,
  isErrorStatusConflict,
  isErrorStatusGone,
  isErrorStatusUnprocessableEntity,
  isErrorTooManyRequests,
} from "../getErrorStatus";

const createError = (status: number) => ({
  response: {
    status,
  },
});

describe("errorStatus", () => {
  it("returns error response status", () => {
    const error = createError(400);

    expect(errorStatus(error)).toBe(400);
  });

  it("returns undefined when response status is absent", () => {
    expect(errorStatus({})).toBeUndefined();
  });
});

describe("error status helpers", () => {
  it("returns true for incorrect data status", () => {
    expect(
      isErrorStatusIncorrectData(createError(HTTP_STATUSES.incorrectData))
    ).toBe(true);
  });

  it("returns true for unauthorized status", () => {
    expect(
      isErrorStatusUnauthorized(createError(HTTP_STATUSES.unauthorized))
    ).toBe(true);
  });

  it("returns true for forbidden status", () => {
    expect(isErrorStatusForbidden(createError(HTTP_STATUSES.forbidden))).toBe(
      true
    );
  });

  it("returns true for not found status", () => {
    expect(isErrorStatusNotFound(createError(HTTP_STATUSES.notFound))).toBe(
      true
    );
  });

  it("returns true for conflict status", () => {
    expect(isErrorStatusConflict(createError(HTTP_STATUSES.conflict))).toBe(
      true
    );
  });

  it("returns true for gone status", () => {
    expect(isErrorStatusGone(createError(HTTP_STATUSES.gone))).toBe(true);
  });

  it("returns true for unprocessable entity status", () => {
    expect(
      isErrorStatusUnprocessableEntity(
        createError(HTTP_STATUSES.unprocessableEntity)
      )
    ).toBe(true);
  });

  it("returns true for too many requests status", () => {
    expect(
      isErrorTooManyRequests(createError(HTTP_STATUSES.tooManyRequests))
    ).toBe(true);
  });

  it("returns false for different status", () => {
    const error = createError(500);

    expect(isErrorStatusIncorrectData(error)).toBe(false);
    expect(isErrorStatusUnauthorized(error)).toBe(false);
    expect(isErrorStatusForbidden(error)).toBe(false);
    expect(isErrorStatusNotFound(error)).toBe(false);
    expect(isErrorStatusConflict(error)).toBe(false);
    expect(isErrorStatusGone(error)).toBe(false);
    expect(isErrorStatusUnprocessableEntity(error)).toBe(false);
    expect(isErrorTooManyRequests(error)).toBe(false);
  });
});
