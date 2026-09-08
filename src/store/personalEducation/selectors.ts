import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { EDUCATION_DEFAULT_VALUES } from '@/lib/constants/forms/resumeEdit/education';
import { RootState } from '../store';

type PersonalEducationState = Pick<RootState, "personalEducation">;

const getState = (state: PersonalEducationState) => state;

export const isLoadingSelector = createSelector(getState, state => state.personalEducation.status === "loading");
export const personalEducationSelector = createSelector(getState, path(["personalEducation", "data"]));

export const personalEducationByLocaleSelector = createSelector(
  [(_, locale) => locale, personalEducationSelector],
  (locale, data) => ({
    sectionTitle: pathOr("", ["sectionTitle", locale], data),

    education: data?.education?.[locale]?.length
      ? data.education[locale]
      : EDUCATION_DEFAULT_VALUES,
  }),
);
