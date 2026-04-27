import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalHobbiesRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import {
  userIdSelector,
  personalHobbiesIdSelector,
} from "@/store/auth/selectors";
import { UPDATE_PERSONAL_HOBBIES } from "../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    sectionTitle?: string,
    hobbies: { hobby: string }[],
  };
  locale: Locales;
};

const updatePersonalHobbiesOperation = createAsyncThunk(
  UPDATE_PERSONAL_HOBBIES,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const personalHobbiesId = personalHobbiesIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
        userId
      };

      const { data } = await axios.patch(personalHobbiesRoute(personalHobbiesId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalHobbiesOperation;
