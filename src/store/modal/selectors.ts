import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const getState = (state: RootState) => state;

export const modalSelector = createSelector(getState, (state: RootState) => state.modal);
