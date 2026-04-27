import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalLanguagesRoute } from "@/lib/apiRoutes";
import { personalLanguagesIdSelector } from "@/store/auth/selectors";
import { FETCH_PERSONAL_LANGUAGES } from "../types";
import { RootState } from '../../store';

const fetchPersonalLanguagesOperation = createAsyncThunk(
  FETCH_PERSONAL_LANGUAGES,
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalLanguagesId = personalLanguagesIdSelector(state);

      const { data } = await axios.get(personalLanguagesRoute(personalLanguagesId));

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchPersonalLanguagesOperation;
