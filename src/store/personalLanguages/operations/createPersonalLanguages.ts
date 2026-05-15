import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalLanguagesCreateRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalLanguages";
import { formattedParams } from '@/utils/forms/formattedParams/resume/languages';
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_LANGUAGES } from "./../types";
import { RootState } from '../../store';

const createPersonalLanguagesOperation = createAsyncThunk(
  CREATE_PERSONAL_LANGUAGES,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);

      const { data } = await axios.post(personalLanguagesCreateRoute, { ...formattedParams(params), userId });
      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalLanguagesOperation;
