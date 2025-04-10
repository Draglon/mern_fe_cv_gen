import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { authLoginRoute } from "@/lib/apiRoutes";
import { FETCH_LOGIN } from "./../types";

type ParamsType = {
  email?: string;
  password?: string;
};

const fetchAuthOperation = createAsyncThunk(
  FETCH_LOGIN,
  async (params: ParamsType) => {
    try {
      const { data } = await axios.post(authLoginRoute, params);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchAuthOperation;
