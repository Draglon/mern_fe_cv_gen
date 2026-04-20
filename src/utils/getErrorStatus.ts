import { path } from 'ramda';

import { HTTP_STATUSES } from '@/lib/constants';

export const errorStatus = (error: any) => path(['response', 'status'], error);

export const isErrorStatusUnauthorized = (error: any) => errorStatus(error) === HTTP_STATUSES.unauthorized

export const isErrorStatusForbidden = (error: any) => errorStatus(error) === HTTP_STATUSES.forbidden

export const isErrorStatusNotFound = (error: any) => errorStatus(error) === HTTP_STATUSES.notFound

export const isErrorStatusGone = (error: any) => errorStatus(error) === HTTP_STATUSES.gone

export const isErrorStatusUnprocessableEntity = (error: any) => errorStatus(error) === HTTP_STATUSES.unprocessableEntity

export const isErrorTooManyRequests = (error: any) => errorStatus(error) === HTTP_STATUSES.tooManyRequests
