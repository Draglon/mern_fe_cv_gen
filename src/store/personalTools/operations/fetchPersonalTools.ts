import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalToolsRoute } from "@/lib/apiRoutes";
import { FETCH_PERSONAL_TOOLS } from "../types";

type ParamsType = {
  id: string;
};

const fetchPersonalToolsOperation = createAsyncThunk(
  FETCH_PERSONAL_TOOLS,
  async (params: ParamsType) => {
    const { id } = params;

    try {
      const { data } = await axios.get(personalToolsRoute(id));

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchPersonalToolsOperation;
