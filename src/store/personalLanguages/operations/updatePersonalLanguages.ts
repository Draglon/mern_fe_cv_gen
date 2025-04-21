import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalLanguagesRoute } from "@/lib/apiRoutes";
import { UPDATE_PERSONAL_LANGUAGES } from "../types";

type ParamsType = {
  personalLanguagesId: string;
};

const updatePersonalLanguagesOperation = createAsyncThunk(
  UPDATE_PERSONAL_LANGUAGES,
  async (params: ParamsType) => {
    const { personalLanguagesId } = params;

    try {
      const { data } = await axios.patch(personalLanguagesRoute(personalLanguagesId), params);

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default updatePersonalLanguagesOperation;
