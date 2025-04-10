import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalToolsCreateRoute } from "@/lib/apiRoutes";
import { CREATE_PERSONAL_TOOLS } from "./../types";

type ParamsType = {
  locale: string;
  userId: string;
  tools: {
    tool: string;
    level: string;
    visible: boolean;
  }[];
};

const createPersonalToolsOperation = createAsyncThunk(
  CREATE_PERSONAL_TOOLS,
  async (params: ParamsType) => {
    try {
      const { data } = await axios.post(personalToolsCreateRoute, params);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default createPersonalToolsOperation;
