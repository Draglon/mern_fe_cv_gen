import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalInfoRoute } from "@/lib/apiRoutes";
import { FETCH_PERSONAL_INFO } from "../types";

type ParamsType = {
  id: string;
};

const fetchPersonalInfoOperation = createAsyncThunk(
  FETCH_PERSONAL_INFO,
  async (params: ParamsType) => {
    const { id } = params;

    try {
      const { data } = await axios.get(personalInfoRoute(id));

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchPersonalInfoOperation;
