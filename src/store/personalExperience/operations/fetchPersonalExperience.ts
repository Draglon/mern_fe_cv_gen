import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalExperienceRoute } from "@/lib/apiRoutes";
import { FETCH_PERSONAL_EXPERIENCE } from "../types";

type ParamsType = {
  id: string;
};

const fetchPersonalExperienceOperation = createAsyncThunk(
  FETCH_PERSONAL_EXPERIENCE,
  async (params: ParamsType) => {
    const { id } = params;

    try {
      const { data } = await axios.get(personalExperienceRoute(id));

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchPersonalExperienceOperation;
