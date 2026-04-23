import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { usersEmailRoute } from "@/lib/apiRoutes";
import { isErrorStatusIncorrectData, isErrorStatusUnauthorized } from "@/utils/getErrorStatus";
import { userIdSelector } from "../selectors";
import { UPDATE_USER_EMAIL } from "../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    newEmail: string;
    password: string;
  },
  form: {
    setError: any;
  }
  tSettings: any;
};

const updateUserEmailOperation = createAsyncThunk(
  UPDATE_USER_EMAIL,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = userIdSelector(state);
    const { values, form, tSettings } = params;

    try {
      const { data } = await axios.patch(usersEmailRoute(userId), values);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      if (isErrorStatusIncorrectData(error)) {
        form.setError("password", {
          type: "manual",
          message: tSettings("changeEmail.form.password.errors.currentPassword"),
        });
      }
      if (isErrorStatusUnauthorized(error)) {
        form.setError("newEmail", {
          type: "manual",
          message: tSettings("changeEmail.form.email.errors.alreadyExists"),
        });
      }
      return rejectWithValue(error);
    }
  },
);

export default updateUserEmailOperation;
