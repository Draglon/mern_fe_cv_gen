import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalCourses.status === "loading");
export const personalCoursesSelector = createSelector(getState, path(["personalCourses", "data"]));
export const personalCoursesByLocaleSelector = createSelector([(_, locale) => locale, personalCoursesSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  courses: data?.courses?.[locale] ? JSON.parse(data.courses[locale]) : [
    {
      course: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  ],
}));