import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalCoursesRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalCourses";
import { personalCoursesIdSelector } from "@/store/auth/selectors";
import { UPDATE_PERSONAL_COURSES } from "../types";
import { RootState } from '../../store';

const updatePersonalCoursesOperation = createAsyncThunk(
  UPDATE_PERSONAL_COURSES,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalCoursesId = personalCoursesIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
      };

      const { data } = await axios.patch(personalCoursesRoute(personalCoursesId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalCoursesOperation;
