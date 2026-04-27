import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalToolsRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import {
  userIdSelector,
  personalToolsIdSelector,
} from "@/store/auth/selectors";
import { UPDATE_PERSONAL_TOOLS } from "../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    sectionTitle?: string,
    tools: {
      name: string;
      level: string;
      visible: boolean;
    }[];
  };
  locale: Locales;
};

const updatePersonalToolsOperation = createAsyncThunk(
  UPDATE_PERSONAL_TOOLS,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const personalToolsId = personalToolsIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
        userId
      };

      const { data } = await axios.patch(personalToolsRoute(personalToolsId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalToolsOperation;
