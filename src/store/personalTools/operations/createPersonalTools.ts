import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalToolsCreateRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalTools";
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_TOOLS } from "./../types";
import { RootState } from '../../store';

const createPersonalToolsOperation = createAsyncThunk(
  CREATE_PERSONAL_TOOLS,
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

      const { data } = await axios.post(personalToolsCreateRoute, formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalToolsOperation;
