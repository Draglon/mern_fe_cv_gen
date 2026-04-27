import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalTools.status === "loading");
export const personalToolsSelector = createSelector(getState, path(["personalTools", "data"]));

export const personalToolsByLocaleSelector = createSelector([(_, locale) => locale, personalToolsSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  tools: data?.tools?.[locale] ? JSON.parse(data.tools[locale]) : [
    {
      tool: "",
      level: "",
      visible: true,
    },
  ],
}));
