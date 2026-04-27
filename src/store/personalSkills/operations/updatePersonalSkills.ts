import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalSkillsRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import {
  userIdSelector,
  personalSkillsIdSelector,
} from "@/store/auth/selectors";
import { UPDATE_PERSONAL_SKILLS } from "../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    sectionTitle?: string,
    skills: {
      skill: string;
      level: string | number;
      visible: boolean;
    }[];
  };
  locale: Locales;
};

const updatePersonalSkillsOperation = createAsyncThunk(
  UPDATE_PERSONAL_SKILLS,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const personalSkillsId = personalSkillsIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
        userId
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
