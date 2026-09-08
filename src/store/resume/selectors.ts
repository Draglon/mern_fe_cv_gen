import { createSelector } from '@reduxjs/toolkit';
import { path } from 'ramda';

import { RootState } from '../store';

type ResumeState = Pick<RootState, "resume">;

const getState = (state: ResumeState) => state;

export const isLoadingSelector = createSelector(getState, state => state.resume.status === "loading");
export const resumeSelector = createSelector(getState, path(["resume", "data"]));
