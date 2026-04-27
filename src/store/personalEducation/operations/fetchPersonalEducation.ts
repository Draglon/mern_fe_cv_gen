import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalEducationRoute } from "@/lib/apiRoutes";
import { personalEducationIdSelector } from "@/store/auth/selectors";
import { FETCH_PERSONAL_EDUCATION } from "../types";
import { RootState } from '../../store';

const fetchPersonalEducationOperation = createAsyncThunk(
  FETCH_PERSONAL_EDUCATION,
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalEducationId = personalEducationIdSelector(state);
      const { data } = await axios.get(personalEducationRoute(personalEducationId));

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchPersonalEducationOperation;
