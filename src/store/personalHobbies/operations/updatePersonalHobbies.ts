import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalHobbiesRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalHobbies";
import { personalHobbiesIdSelector } from "@/store/auth/selectors";
import { UPDATE_PERSONAL_HOBBIES } from "../types";
import { RootState } from '../../store';

const updatePersonalHobbiesOperation = createAsyncThunk(
  UPDATE_PERSONAL_HOBBIES,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalHobbiesId = personalHobbiesIdSelector(state);
      const { values, locale, resumeLocale } = params;
      const formattedParams = {
        ...values,
        locale,
        resumeLocale,
      };

      const { data } = await axios.put(personalHobbiesRoute(personalHobbiesId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalHobbiesOperation;
