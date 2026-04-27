import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalHobbiesRoute } from "@/lib/apiRoutes";
import { personalHobbiesIdSelector } from "@/store/auth/selectors";
import { FETCH_PERSONAL_HOBBIES } from "../types";
import { RootState } from '../../store';

const fetchPersonalHobbiesOperation = createAsyncThunk(
  FETCH_PERSONAL_HOBBIES,
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalHobbiesId = personalHobbiesIdSelector(state);
      const { data } = await axios.get(personalHobbiesRoute(personalHobbiesId));

      return data;
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchPersonalHobbiesOperation;
