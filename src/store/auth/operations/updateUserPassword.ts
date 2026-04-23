import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { usersPasswordRoute } from "@/lib/apiRoutes";
import { isErrorStatusIncorrectData } from "@/utils/getErrorStatus";
import { userIdSelector } from "../selectors";
import { UPDATE_USER_PASSWORD } from "../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    currentPassword: string;
    newPassword: string;
  },
  form: {
    setError: any;
  }
  tSettings: any;
};

const updateUserPasswordOperation = createAsyncThunk(
  UPDATE_USER_PASSWORD,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = userIdSelector(state);
    const { values, form, tSettings } = params;

    try {
      await axios.patch(usersPasswordRoute(userId), values);
    } catch (error: unknown) {
      console.log("error: ", error);
      if (isErrorStatusIncorrectData(error)) {
        form.setError("currentPassword", {
          type: "manual",
          message: tSettings("changePassword.form.password.errors.currentPassword"),
        });
      }
      return rejectWithValue(error);
    }
  },
);

export default updateUserPasswordOperation;
