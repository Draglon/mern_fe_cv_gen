import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalExperienceCreateRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalExperiences";
import { formattedParams } from '@/utils/forms/formattedParams/resume/experiences';
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_EXPERIENCE } from "./../types";
import { RootState } from '../../store';

const createPersonalExperienceOperation = createAsyncThunk(
  CREATE_PERSONAL_EXPERIENCE,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);

      const { data } = await axios.post(personalExperienceCreateRoute, { ...formattedParams(params), userId });
      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalExperienceOperation;
