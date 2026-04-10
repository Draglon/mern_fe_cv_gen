import { createSelector } from '@reduxjs/toolkit';
import { path } from 'ramda';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const isLoadingSelector = createSelector(getState, (state: RootState) => state.personalHobbies.status === "loading");
export const personalHobbiesSelector = createSelector(getState, path(["personalHobbies", "data"]));
