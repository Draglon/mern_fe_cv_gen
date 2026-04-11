import { createSelector } from '@reduxjs/toolkit';
import { path, prop } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.auth.status === "loading");
export const isAuthSelector = createSelector(getState, (state: RootState) => Boolean(state.auth.data));
// export const userSelector = createSelector(getState, (state: RootState) => state.auth.data);
export const userSelector = createSelector(getState, path(["auth", "data"]));

export const userIdSelector = createSelector(userSelector, prop("_id"));
export const personalInfoIdSelector = createSelector(userSelector, prop("personalInfoId"));
export const personalHobbiesIdSelector = createSelector(userSelector, prop("personalHobbiesId"));
export const personalLanguagesIdSelector = createSelector(userSelector, prop("personalLanguagesId"));
export const personalExperienceIdSelector = createSelector(userSelector, prop("personalExperienceId"));
export const personalEducationIdSelector = createSelector(userSelector, prop("personalEducationId"));
export const personalCoursesIdSelector = createSelector(userSelector, prop("personalCoursesId"));
export const personalSkillsIdSelector = createSelector(userSelector, prop("personalSkillsId"));
export const personalToolsIdSelector = createSelector(userSelector, prop("personalToolsId"));
