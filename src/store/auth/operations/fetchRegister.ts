import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { authRegistrationRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/signup";
import { FETCH_REGISTER } from "./../types";

const fetchRegistrationOperation = createAsyncThunk(
  FETCH_REGISTER,
  async (params: ParamsType, { rejectWithValue }) => {

    try {
      const { data } = await axios.post(authRegistrationRoute, params);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchRegistrationOperation;
