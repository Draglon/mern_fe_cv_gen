import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalInfoRoute } from "@/lib/apiRoutes";
import { personalInfoIdSelector } from "@/store/auth/selectors";
import { FETCH_PERSONAL_INFO } from "../types";
import { RootState } from '../../store';

const fetchPersonalInfoOperation = createAsyncThunk(
  FETCH_PERSONAL_INFO,
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalInfoId = personalInfoIdSelector(state);
      const { data } = await axios.get(personalInfoRoute(personalInfoId));

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchPersonalInfoOperation;
