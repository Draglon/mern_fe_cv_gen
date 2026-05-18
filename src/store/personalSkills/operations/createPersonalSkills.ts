import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalSkillsCreateRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalSkills";
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_SKILLS } from "./../types";
import { RootState } from '../../store';

const createPersonalSkillsOperation = createAsyncThunk(
  CREATE_PERSONAL_SKILLS,
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

      const { data } = await axios.post(personalSkillsCreateRoute, formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalSkillsOperation;
