import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalExperienceRoute } from "@/lib/apiRoutes";
import { personalExperienceIdSelector } from "@/store/auth/selectors";
import { FETCH_PERSONAL_EXPERIENCE } from "../types";
import { RootState } from '../../store';

const fetchPersonalExperienceOperation = createAsyncThunk(
  FETCH_PERSONAL_EXPERIENCE,
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalExperienceId = personalExperienceIdSelector(state);
      const { data } = await axios.get(personalExperienceRoute(personalExperienceId));

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchPersonalExperienceOperation;
