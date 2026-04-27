import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalLanguagesRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import {
  userIdSelector,
  personalLanguagesIdSelector,
} from "@/store/auth/selectors";
import { UPDATE_PERSONAL_LANGUAGES } from "../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    sectionTitle?: string,
    languages: {
      language: string;
      level: string;
    }[];
  };
  locale: Locales;
};

const updatePersonalLanguagesOperation = createAsyncThunk(
  UPDATE_PERSONAL_LANGUAGES,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const personalLanguagesId = personalLanguagesIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
        userId
      };

      const { data } = await axios.patch(personalLanguagesRoute(personalLanguagesId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalLanguagesOperation;
