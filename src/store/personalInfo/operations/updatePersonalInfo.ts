import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalInfoRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume/personalInfo";
import { normalizeUrl } from "@/utils/normalizeUrl";
import { personalInfoIdSelector } from "@/store/auth/selectors";
import { UPDATE_PERSONAL_INFO } from "../types";
import { RootState } from '../../store';

const updatePersonalInfoOperation = createAsyncThunk(
  UPDATE_PERSONAL_INFO,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalInfoId = personalInfoIdSelector(state);
      const { values, locale } = params;
      const userUrl: string = await normalizeUrl(values.userUrl);
      const formattedParams = {
        ...values,
        userUrl,
        locale,
      };

      const { data } = await axios.patch(personalInfoRoute(personalInfoId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalInfoOperation;
