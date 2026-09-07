import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { usersEmailRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/settings/changeEmail";
import { userIdSelector } from "../selectors";
import { UPDATE_USER_EMAIL } from "../types";
import { RootState } from '../../store';

const updateUserEmailOperation = createAsyncThunk(
  UPDATE_USER_EMAIL,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = userIdSelector(state);

    try {
      const { data } = await axios.patch(usersEmailRoute(userId), params);

      return data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export default updateUserEmailOperation;
