import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { usersRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/settings/deleteAccount";
import { userIdSelector } from "../selectors";
import { DELETE_ACCOUNT } from "../types";
import { RootState } from '../../store';

const deleteAccountOperation = createAsyncThunk(
  DELETE_ACCOUNT,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = userIdSelector(state);

    try {
      await axios.delete(usersRoute(userId), { data: params });
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default deleteAccountOperation;