import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { TOOLS_DEFAULT_VALUES } from '@/lib/constants/forms/resumeEdit/tools';
import { RootState } from '../store';

type PersonalSkillsState = Pick<RootState, "personalTools">;

const getState = (state: PersonalSkillsState) => state;

export const isLoadingSelector = createSelector(getState, state => state.personalTools.status === "loading");
export const personalToolsSelector = createSelector(getState, path(["personalTools", "data"]));

export const personalToolsByLocaleSelector = createSelector([(_, locale) => locale, personalToolsSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  tools: data?.tools?.[locale]?.length ? data.tools[locale] : TOOLS_DEFAULT_VALUES,
}));
