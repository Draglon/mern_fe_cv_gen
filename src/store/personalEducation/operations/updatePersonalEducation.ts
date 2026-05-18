import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalEducationRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalEducation";
import { personalEducationIdSelector } from "@/store/auth/selectors";
import { UPDATE_PERSONAL_EDUCATION } from "../types";
import { RootState } from '../../store';

const updatePersonalEducationOperation = createAsyncThunk(
  UPDATE_PERSONAL_EDUCATION,
  async (params: ParamsType, { getState, rejectWithValue }) => {

    try {
      const state = getState() as RootState;
      const personalEducationId = personalEducationIdSelector(state);
      const { values, locale, resumeLocale } = params;
      const formattedParams = {
        ...values,
        locale,
        resumeLocale,
      };

      const { data } = await axios.patch(personalEducationRoute(personalEducationId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalEducationOperation;
