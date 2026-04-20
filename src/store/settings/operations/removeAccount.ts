import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { usersRoute } from "@/lib/apiRoutes";
import { REMOVE_ACCOUNT } from "../types";

type ParamsType = {
  userId: string;
};

const removeAccountOperation = createAsyncThunk(
  REMOVE_ACCOUNT,
  async (params: ParamsType, { rejectWithValue }) => {
    const { userId } = params;

    try {
      await axios.delete(usersRoute(userId));
      localStorage.removeItem("token");
    } catch (error: any) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export default removeAccountOperation;