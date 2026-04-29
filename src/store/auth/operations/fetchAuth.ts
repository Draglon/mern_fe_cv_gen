import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { authLoginRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/login";
import { FETCH_LOGIN } from "./../types";

const fetchAuthOperation = createAsyncThunk(
  FETCH_LOGIN,
  async (params: ParamsType, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(authLoginRoute, params);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchAuthOperation;
