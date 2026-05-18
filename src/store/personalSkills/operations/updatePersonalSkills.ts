import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalSkillsRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalSkills";
import { personalSkillsIdSelector } from "@/store/auth/selectors";
import { UPDATE_PERSONAL_SKILLS } from "../types";
import { RootState } from '../../store';

const updatePersonalSkillsOperation = createAsyncThunk(
  UPDATE_PERSONAL_SKILLS,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalSkillsId = personalSkillsIdSelector(state);
      const { values, locale, resumeLocale } = params;
      const formattedParams = {
        ...values,
        locale,
        resumeLocale,
      };

      const { data } = await axios.patch(personalSkillsRoute(personalSkillsId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalSkillsOperation;
