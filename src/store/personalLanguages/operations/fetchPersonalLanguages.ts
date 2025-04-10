import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalLanguagesRoute } from "@/lib/apiRoutes";
import { FETCH_PERSONAL_LANGUAGES } from "../types";

type ParamsType = {
  id: string;
};

const fetchPersonalLanguagesOperation = createAsyncThunk(
  FETCH_PERSONAL_LANGUAGES,
  async (params: ParamsType) => {
    const { id } = params;

    try {
      const { data } = await axios.get(personalLanguagesRoute(id));

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchPersonalLanguagesOperation;
