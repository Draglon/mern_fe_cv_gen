import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalToolsCreateRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_TOOLS } from "./../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    sectionTitle?: string,
    tools: {
      tool: string;
      level: string;
      visible: boolean;
    }[];
  };
  locale: Locales;
};

const createPersonalToolsOperation = createAsyncThunk(
  CREATE_PERSONAL_TOOLS,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
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
