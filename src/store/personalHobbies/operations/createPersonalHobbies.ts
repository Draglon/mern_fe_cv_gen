import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalHobbiesCreateRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_HOBBIES } from "./../types";
import { RootState } from '../../store';

type ParamsType = {
  sectionTitle?: string,
  hobbies: { hobby: string }[],
  locale: Locales;
};

const createPersonalHobbiesOperation = createAsyncThunk(
  CREATE_PERSONAL_HOBBIES,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const { data } = await axios.post(personalHobbiesCreateRoute, { ...params, userId });

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalHobbiesOperation;
