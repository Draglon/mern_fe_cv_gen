import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { ParamsType } from "@/lib/constants/props/profile";
import { usersRoute } from "@/lib/apiRoutes";
import { normalizeUrl } from "@/utils/normalizeUrl";
import { userIdSelector } from "../selectors";
import { UPDATE_USER_PROFILE } from "../types";
import { RootState } from '../../store';

const updateUserProfileOperation = createAsyncThunk(
  UPDATE_USER_PROFILE,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = userIdSelector(state);

    try {
      const avatarUrl = await normalizeUrl(params.avatarUrl);
      const { data } = await axios.patch(usersRoute(userId), { ...params, avatarUrl });

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updateUserProfileOperation;
