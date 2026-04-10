import { createSelector } from '@reduxjs/toolkit';
import { path } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalLanguages.status === "loading");
export const personalLanguagesSelector = createSelector(getState, path(["personalLanguages", "data"]));
