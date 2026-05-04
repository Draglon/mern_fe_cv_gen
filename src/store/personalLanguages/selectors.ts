import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { LANGUAGES_DEFAULT_VALUES } from '@/lib/constants/forms/resumeEdit/languages';
import { languagesByLocale } from "@/utils/personalLanguages";
import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalLanguages.status === "loading");
export const personalLanguagesSelector = createSelector(getState, path(["personalLanguages", "data"]));

export const personalLanguagesByLocaleSelector = createSelector([(_, locale) => locale, personalLanguagesSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  languages: data?.languages?.[locale] ? languagesByLocale(data, locale) : LANGUAGES_DEFAULT_VALUES,
}));
