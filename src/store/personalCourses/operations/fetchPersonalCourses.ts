import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalCoursesRoute } from "@/lib/apiRoutes";
import { personalCoursesIdSelector } from "@/store/auth/selectors";
import { FETCH_PERSONAL_COURSES } from "../types";
import { RootState } from '../../store';

const fetchPersonalCoursesOperation = createAsyncThunk(
  FETCH_PERSONAL_COURSES,
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalCoursesId = personalCoursesIdSelector(state);
      const { data } = await axios.get(personalCoursesRoute(personalCoursesId));

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchPersonalCoursesOperation;
