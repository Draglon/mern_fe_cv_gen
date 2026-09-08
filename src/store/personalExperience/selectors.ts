import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { EXPERIENCES_DEFAULT_VALUES } from '@/lib/constants/forms/resumeEdit/experiences';
import { experienceByLocale } from "@/utils/personalExperience";
import { RootState } from '../store';

type PersonalExperienceState = Pick<RootState, "personalExperience">;

const getState = (state: PersonalExperienceState) => state;

export const isLoadingSelector = createSelector(getState, state => state.personalExperience.status === "loading");
export const personalExperienceSelector = createSelector(getState, path(["personalExperience", "data"]));

export const personalExperienceByLocaleSelector = createSelector([(_, locale) => locale, personalExperienceSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  recentPositionsCount: pathOr(0, ["recentPositionsCount", locale], data),
  experiences: data?.experiences?.[locale]?.length ? experienceByLocale(locale, data) : EXPERIENCES_DEFAULT_VALUES,
}));
