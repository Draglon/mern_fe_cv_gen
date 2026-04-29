import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { usersPasswordRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/settings/changePassword";
import { userIdSelector } from "../selectors";
import { UPDATE_USER_PASSWORD } from "../types";
import { RootState } from '../../store';

const updateUserPasswordOperation = createAsyncThunk(
  UPDATE_USER_PASSWORD,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = userIdSelector(state);

    try {
      await axios.patch(usersPasswordRoute(userId), params);
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updateUserPasswordOperation;
