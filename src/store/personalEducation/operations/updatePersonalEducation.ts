import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalEducationRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import { userIdSelector, personalEducationIdSelector } from "@/store/auth/selectors";
import { UPDATE_PERSONAL_EDUCATION } from "../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    sectionTitle?: string,
    education: {
      institute: string;
      degree: string;
      faculty: string;
      specialization: string;
      startDate: string;
      endDate: string;
    }[];
  }
  locale: Locales;
};

const updatePersonalEducationOperation = createAsyncThunk(
  UPDATE_PERSONAL_EDUCATION,
  async (params: ParamsType, { getState, rejectWithValue }) => {

    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const personalEducationId = personalEducationIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
        userId
      };

      const { data } = await axios.patch(personalEducationRoute(personalEducationId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalEducationOperation;
