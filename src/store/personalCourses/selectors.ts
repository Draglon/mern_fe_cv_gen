import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { COURSES_DEFAULT_VALUES } from '@/lib/constants/forms/resumeEdit/courses';
import { RootState } from '../store';

type PersonalCoursesState = Pick<RootState, "personalCourses">;

const getState = (state: PersonalCoursesState) => state;

export const isLoadingSelector = createSelector(getState, state => state.personalCourses.status === "loading");
export const personalCoursesSelector = createSelector(getState, path(["personalCourses", "data"]));

export const personalCoursesByLocaleSelector = createSelector(
  [(_, locale) => locale, personalCoursesSelector],
  (locale, data) => ({
    sectionTitle: pathOr("", ["sectionTitle", locale], data),

    courses: data?.courses?.[locale]?.length
      ? data.courses[locale]
      : COURSES_DEFAULT_VALUES,
  }),
);
