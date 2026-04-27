import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalLanguages.status === "loading");
export const personalLanguagesSelector = createSelector(getState, path(["personalLanguages", "data"]));

export const personalLanguagesByLocaleSelector = createSelector([(_, locale) => locale, personalLanguagesSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  languages: data?.languages?.[locale] ? JSON.parse(data.languages[locale]) : [{ language: "", level: "" }],
}));
