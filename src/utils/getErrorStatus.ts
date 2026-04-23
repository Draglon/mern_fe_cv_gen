import { path } from 'ramda';

import { HTTP_STATUSES } from '@/lib/constants';

export const errorStatus = (error: unknown) => path(['response', 'status'], error);

export const isErrorStatusIncorrectData = (error: unknown) => errorStatus(error) === HTTP_STATUSES.incorrectData;

export const isErrorStatusUnauthorized = (error: unknown) => errorStatus(error) === HTTP_STATUSES.unauthorized;

export const isErrorStatusForbidden = (error: unknown) => errorStatus(error) === HTTP_STATUSES.forbidden;

export const isErrorStatusNotFound = (error: unknown) => errorStatus(error) === HTTP_STATUSES.notFound;

export const isErrorStatusGone = (error: unknown) => errorStatus(error) === HTTP_STATUSES.gone;

export const isErrorStatusUnprocessableEntity = (error: unknown) => errorStatus(error) === HTTP_STATUSES.unprocessableEntity;

export const isErrorTooManyRequests = (error: unknown) => errorStatus(error) === HTTP_STATUSES.tooManyRequests;
