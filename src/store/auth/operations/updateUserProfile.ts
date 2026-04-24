import { createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "ramda";

import getBase64 from "@/utils/getBase64";
import axios from "@/lib/axios";
import { FieldType } from "@/lib/constants/props/profile";
import { usersRoute } from "@/lib/apiRoutes";
import { userIdSelector } from "../selectors";
import { UPDATE_USER_PROFILE } from "../types";
import { RootState } from '../../store';

type ParamsType = {
  values: FieldType,
};

const updateUserProfileOperation = createAsyncThunk(
  UPDATE_USER_PROFILE,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = userIdSelector(state);
    const { values } = params;

    try {
      const avatarUrl = !isEmpty(values.avatarUrl) ? await getBase64(values.avatarUrl[0]) : "";
      const { data } = await axios.patch(usersRoute(userId), { ...values, avatarUrl });

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updateUserProfileOperation;
