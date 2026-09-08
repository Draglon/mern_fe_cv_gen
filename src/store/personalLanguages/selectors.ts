import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { LANGUAGES_DEFAULT_VALUES } from '@/lib/constants/forms/resumeEdit/languages';
import { languagesByLocale } from "@/utils/personalLanguages";
import { RootState } from '../store';

type PersonalLanguagesState = Pick<RootState, "personalLanguages">;

const getState = (state: PersonalLanguagesState) => state;

export const isLoadingSelector = createSelector(getState, state => state.personalLanguages.status === "loading");
export const personalLanguagesSelector = createSelector(getState, path(["personalLanguages", "data"]));

export const personalLanguagesByLocaleSelector = createSelector(
  [(_, locale) => locale, personalLanguagesSelector],
  (locale, data) => ({
    sectionTitle: pathOr("", ["sectionTitle", locale], data),
    languages: data?.languages?.[locale]?.length
      ? languagesByLocale(locale, data)
      : LANGUAGES_DEFAULT_VALUES,
  }),
);
