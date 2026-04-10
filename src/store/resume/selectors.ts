import { createSelector } from '@reduxjs/toolkit';
import { path } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.resume.status === "loading");
export const resumeSelector = createSelector(getState, path(["resume", "data"]));
