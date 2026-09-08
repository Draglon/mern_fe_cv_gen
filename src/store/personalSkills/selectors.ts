import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { SKILLS_DEFAULT_VALUES } from '@/lib/constants/forms/resumeEdit/skills';
import { RootState } from '../store';

type PersonalSkillsState = Pick<RootState, "personalSkills">;

const getState = (state: PersonalSkillsState) => state;

export const isLoadingSelector = createSelector(getState, state => state.personalSkills.status === "loading");
export const personalSkillsSelector = createSelector(getState, path(["personalSkills", "data"]));

export const personalSkillsByLocaleSelector = createSelector([(_, locale) => locale, personalSkillsSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  skills: data?.skills?.[locale]?.length ? data.skills[locale] : SKILLS_DEFAULT_VALUES,
}));
