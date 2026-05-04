import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalEducationCreateRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalEducation";
import { CREATE_PERSONAL_EDUCATION } from "./../types";
import { userIdSelector } from "@/store/auth/selectors";
import { RootState } from '../../store';

const createPersonalEducationOperation = createAsyncThunk(
  CREATE_PERSONAL_EDUCATION,
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

      const { data } = await axios.post(personalEducationCreateRoute, formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalEducationOperation;
