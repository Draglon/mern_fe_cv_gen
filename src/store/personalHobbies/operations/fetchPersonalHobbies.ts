import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalHobbiesRoute } from "@/lib/apiRoutes";
import { FETCH_PERSONAL_HOBBIES } from "../types";

type ParamsType = {
  id: string;
};

const fetchPersonalHobbiesOperation = createAsyncThunk(
  FETCH_PERSONAL_HOBBIES,
  async (params: ParamsType) => {
    const { id } = params;

    try {
      const { data } = await axios.get(personalHobbiesRoute(id));

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchPersonalHobbiesOperation;
