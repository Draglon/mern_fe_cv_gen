import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { HOBBIES_DEFAULT_VALUES } from '@/lib/constants/forms/resumeEdit/hobbies';
import { RootState } from '../store';

type PersonalHobbiesState = Pick<RootState, "personalHobbies">;

const getState = (state: PersonalHobbiesState) => state;

export const isLoadingSelector = createSelector(getState, state => state.personalHobbies.status === "loading");
export const personalHobbiesSelector = createSelector(getState, path(["personalHobbies", "data"]));

export const personalHobbiesByLocaleSelector = createSelector([(_, locale) => locale, personalHobbiesSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  hobbies: data?.hobbies?.[locale]?.length ? data.hobbies[locale] : HOBBIES_DEFAULT_VALUES,
}));
