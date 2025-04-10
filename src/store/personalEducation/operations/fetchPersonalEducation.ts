import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalEducationRoute } from "@/lib/apiRoutes";
import { FETCH_PERSONAL_EDUCATION } from "../types";

type ParamsType = {
  id: string;
};

const fetchPersonalEducationOperation = createAsyncThunk(
  FETCH_PERSONAL_EDUCATION,
  async (params: ParamsType) => {
    const { id } = params;

    try {
      const { data } = await axios.get(personalEducationRoute(id));

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchPersonalEducationOperation;
