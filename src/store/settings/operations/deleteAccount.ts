import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { homeRoute } from "@/lib/routes";
import { usersRoute } from "@/lib/apiRoutes";
import { hideModal } from "@/store/modal/actions";
import { logout } from "@/store/auth/actions";
import { DELETE_ACCOUNT } from "../types";

type ParamsType = {
  userId: string;
  values: {
    userName: string;
  };
  router: any,
  locale: any;
};

const deleteAccountOperation = createAsyncThunk(
  DELETE_ACCOUNT,
  async (params: ParamsType, { rejectWithValue, dispatch }) => {
    const { userId, values, router, locale } = params;

    try {
      await axios.delete(usersRoute(userId), { params: values });
      dispatch(hideModal());
      dispatch(logout());
      router.push(homeRoute, { locale });
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default deleteAccountOperation;