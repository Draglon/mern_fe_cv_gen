import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalLanguagesCreateRoute } from "@/lib/apiRoutes";
import { CREATE_PERSONAL_LANGUAGES } from "./../types";

type ParamsType = {
  locale: string;
  userId: string;
  languages: {
    language: string;
    level: string;
  }[];
};

const createPersonalLanguagesOperation = createAsyncThunk(
  CREATE_PERSONAL_LANGUAGES,
  async (params: ParamsType) => {
    try {
      const { data } = await axios.post(personalLanguagesCreateRoute, params);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default createPersonalLanguagesOperation;
