import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalInfoCreateRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalInfo";
import { normalizeUrl } from "@/utils/normalizeUrl";
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_INFO } from "./../types";
import { RootState } from '../../store';

const createPersonalInfoOperation = createAsyncThunk(
  CREATE_PERSONAL_INFO,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const { values, locale, resumeLocale } = params;
      const userUrl: string = await normalizeUrl(values.userUrl);
      const formattedParams = {
        ...values,
        userUrl,
        locale,
        resumeLocale,
        userId,
      };

      const { data } = await axios.post(personalInfoCreateRoute, formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalInfoOperation;
