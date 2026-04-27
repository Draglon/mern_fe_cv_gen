import { createSelector } from '@reduxjs/toolkit';
import { path, pathOr } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalExperience.status === "loading");
export const personalExperienceSelector = createSelector(getState, path(["personalExperience", "data"]));

export const personalExperienceByLocaleSelector = createSelector([(_, locale) => locale, personalExperienceSelector], (locale, data) => ({
  sectionTitle: pathOr("", ["sectionTitle", locale], data),
  lastPlacesOfWorks: pathOr("", ["lastPlacesOfWorks"], data),
  experience: data?.experience?.[locale] ? JSON.parse(data.experience[locale]) : [
    {
      position: "",
      companyName: "",
      location: "",
      placeOfWork: "",
      workingTime: "",
      startDate: "",
      endDate: "",
      description: "",
      skills: [],
    },
  ],
}));