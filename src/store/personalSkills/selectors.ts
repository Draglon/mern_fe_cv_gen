import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalSkills.status === "loading");
export const personalSkillsSelector = createSelector(getState, path(["personalSkills", "data"]));

export const personalSkillsByLocaleSelector = createSelector([(_, locale) => locale, personalSkillsSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  skills: data?.skills?.[locale] ? JSON.parse(data.skills[locale]) : [
    {
      skill: "",
      level: "",
      visible: true,
    },
  ],
}));
