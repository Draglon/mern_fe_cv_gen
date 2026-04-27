import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { Locales } from "@/lib/constants/props/locales";
import { personalEducationCreateRoute } from "@/lib/apiRoutes";
import { CREATE_PERSONAL_EDUCATION } from "./../types";
import { userIdSelector } from "@/store/auth/selectors";
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

const createPersonalEducationOperation = createAsyncThunk(
  CREATE_PERSONAL_EDUCATION,
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

      const { data } = await axios.post(personalEducationCreateRoute, formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalEducationOperation;
