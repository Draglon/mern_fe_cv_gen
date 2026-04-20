import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { homeRoute } from "@/lib/routes";
import { usersRoute } from "@/lib/apiRoutes";
import { hideModal } from "@/store/modal/actions";
import { REMOVE_ACCOUNT } from "../types";

type ParamsType = {
  userId: string;
  values: {
    userName: string;
  };
  router: any,
  locale: any;
};

const removeAccountOperation = createAsyncThunk(
  REMOVE_ACCOUNT,
  async (params: ParamsType, { rejectWithValue, dispatch }) => {
    const { userId, values, router, locale } = params;

    try {
      await axios.delete(usersRoute(userId), { params: values });
      dispatch(hideModal());
      router.push(homeRoute, { locale });
      localStorage.removeItem("token");
    } catch (error: any) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default removeAccountOperation;