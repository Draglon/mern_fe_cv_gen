export const MAX_TEXTAREA_CONTENT_LENGTH = 2000;
export const MAX_TEXTAREA_CONTENT_NORMAL_LENGTH = 1000;
export const MAX_TEXTAREA_CONTENT_SHORT_LENGTH = 255;
export const MAX_TEXTAREA_CONTENT_MIDDLE_LENGTH = 500;
export const MIN_INPUT_LENGTH = 3;
export const MAX_INPUT_LENGTH = 255;
export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;
export const MIN_NIKE_NAME_LENGTH = 3;
export const MAX_NIKE_NAME_LENGTH = 20;
export const MAX_EMAIL_LENGTH = 255;
export const MAX_PASSWORD_LENGTH = 72;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PHONE_NUMBER_LENGTH = 15;
export const MIN_NUMBER = 0;
export const MIN_LEVEL_NUMBER = 0;
export const MAX_LEVEL_NUMBER = 100;

export const HTTP_STATUSES = {
  incorrectData: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  gone: 410,
  unprocessableEntity: 422,
  tooManyRequests: 429,
} as const;

export type HttpStatus =
  (typeof HTTP_STATUSES)[keyof typeof HTTP_STATUSES];

export const HTTP_CODES = {
  incorrectCurrentPassword: "INCORRECT_CURRENT_PASSWORD",
  newPasswordEqualsOld: "NEW_PASSWORD_EQUALS_OLD",
} as const;
