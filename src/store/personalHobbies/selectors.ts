import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { HOBBIES_DEFAULT_VALUES } from '@/lib/constants/forms/resumeEdit/hobbies';
import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalHobbies.status === "loading");
export const personalHobbiesSelector = createSelector(getState, path(["personalHobbies", "data"]));

export const personalHobbiesByLocaleSelector = createSelector([(_, locale) => locale, personalHobbiesSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  hobbies: data?.hobbies?.[locale] ? data.hobbies[locale] : HOBBIES_DEFAULT_VALUES,
}));
