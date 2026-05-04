import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalLanguagesRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalLanguages";
import { formattedParams } from "@/utils/forms/formattedParams/resume/languages";
import { personalLanguagesIdSelector } from "@/store/auth/selectors";
import { UPDATE_PERSONAL_LANGUAGES } from "../types";
import { RootState } from '../../store';

const updatePersonalLanguagesOperation = createAsyncThunk(
  UPDATE_PERSONAL_LANGUAGES,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalLanguagesId = personalLanguagesIdSelector(state);

      const { data } = await axios.patch(personalLanguagesRoute(personalLanguagesId), formattedParams(params));

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalLanguagesOperation;
