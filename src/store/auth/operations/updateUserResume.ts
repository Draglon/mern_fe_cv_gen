import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { usersResumeRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/createResume";
import { userIdSelector } from "../selectors";
import { UPDATE_USER_RESUME } from "../types";
import { RootState } from '../../store';

const updateUserResumeOperation = createAsyncThunk(
  UPDATE_USER_RESUME,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = userIdSelector(state);

    try {
      const { data } = await axios.patch(usersResumeRoute(userId), params);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updateUserResumeOperation;
