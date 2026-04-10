import { createSelector } from '@reduxjs/toolkit';
import { path } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalCourses.status === "loading");
export const personalCoursesSelector = createSelector(getState, path(["personalCourses", "data"]));
