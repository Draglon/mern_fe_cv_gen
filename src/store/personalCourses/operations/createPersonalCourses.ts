import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalCoursesCreateRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_COURSES } from "./../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    sectionTitle?: string,
    courses: {
      course: string;
      description: string;
      startDate: string;
      endDate: string;
    }[];
  };
  locale: Locales;
};

const createPersonalCoursesOperation = createAsyncThunk(
  CREATE_PERSONAL_COURSES,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
        userId
      };

      const { data } = await axios.post(personalCoursesCreateRoute, formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalCoursesOperation;
