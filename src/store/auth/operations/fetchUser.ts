import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { authUserRoute } from "@/lib/apiRoutes";
import { FETCH_USER } from "./../types";

const fetchUserOperation = createAsyncThunk(
  FETCH_USER,
  async () => {
    try {
      const { data } = await axios.get(authUserRoute, {});
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchUserOperation;
