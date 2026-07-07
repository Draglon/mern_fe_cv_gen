import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalExperienceRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalExperiences";
import { formattedParams } from "@/utils/forms/formattedParams/resume/experiences";
import { personalExperiencesIdSelector } from "@/store/auth/selectors";
import { UPDATE_PERSONAL_EXPERIENCE } from "../types";
import { RootState } from '../../store';

const updatePersonalExperienceOperation = createAsyncThunk(
  UPDATE_PERSONAL_EXPERIENCE,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalExperienceId = personalExperiencesIdSelector(state);

      const { data } = await axios.put(personalExperienceRoute(personalExperienceId), formattedParams(params));
      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalExperienceOperation;
