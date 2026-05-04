import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalToolsRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalTools";
import { personalToolsIdSelector } from "@/store/auth/selectors";
import { UPDATE_PERSONAL_TOOLS } from "../types";
import { RootState } from '../../store';

const updatePersonalToolsOperation = createAsyncThunk(
  UPDATE_PERSONAL_TOOLS,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalToolsId = personalToolsIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
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
