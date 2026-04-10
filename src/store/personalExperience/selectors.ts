import { createSelector } from '@reduxjs/toolkit';
import { path } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalExperience.status === "loading");
export const personalExperienceSelector = createSelector(getState, path(["personalExperience", "data"]));
