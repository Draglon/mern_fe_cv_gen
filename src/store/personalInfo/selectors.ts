import { createSelector } from '@reduxjs/toolkit';
import { path } from 'ramda';

import { personalInfoByLocale } from '@/utils/personalInfo';

import { RootState } from '../store';

type PersonalInfoState = Pick<RootState, "personalInfo">;

const getState = (state: PersonalInfoState) => state;

export const isLoadingSelector = createSelector(getState, state => state.personalInfo.status === "loading");
export const personalInfoSelector = createSelector(getState, path(["personalInfo", "data"]));

export const personalInfoByLocaleSelector = createSelector([(_, locale) => locale, personalInfoSelector], (locale, data) => personalInfoByLocale(data, locale));
