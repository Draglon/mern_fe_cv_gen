import { createSelector } from '@reduxjs/toolkit';
import { path } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalEducation.status === "loading");
export const personalEducationSelector = createSelector(getState, path(["personalEducation", "data"]));
