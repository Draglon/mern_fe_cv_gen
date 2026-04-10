import { createSelector } from '@reduxjs/toolkit';
import { path } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalInfo.status === "loading");
export const personalInfoSelector = createSelector(getState, path(["personalInfo", "data"]));
