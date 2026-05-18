import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalHobbiesCreateRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalHobbies";
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_HOBBIES } from "./../types";
import { RootState } from '../../store';

const createPersonalHobbiesOperation = createAsyncThunk(
  CREATE_PERSONAL_HOBBIES,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const { values, locale, resumeLocale } = params;
      const formattedParams = {
        ...values,
        locale,
        resumeLocale,
        userId
      };

      const { data } = await axios.post(personalHobbiesCreateRoute, formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalHobbiesOperation;
