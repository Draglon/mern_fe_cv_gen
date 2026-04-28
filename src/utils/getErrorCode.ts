import { path } from 'ramda';

import { HTTP_CODES } from '@/lib/constants';

export const errorCode = (error: unknown) => path(['response', 'data', 'code'], error);

export const isErrorCodeIncorrectCurrentPassword = (error: unknown) => errorCode(error) === HTTP_CODES.incorrectCurrentPassword;
export const isErrorCodeNewPasswordEqualsOld = (error: unknown) => errorCode(error) === HTTP_CODES.newPasswordEqualsOld;

