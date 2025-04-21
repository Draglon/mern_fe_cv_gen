import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalToolsRoute } from "@/lib/apiRoutes";
import { UPDATE_PERSONAL_TOOLS } from "../types";

type ParamsType = {
  personalToolsId: string;
};

const updatePersonalToolsOperation = createAsyncThunk(
  UPDATE_PERSONAL_TOOLS,
  async (params: ParamsType) => {
    const { personalToolsId } = params;
    try {
      const { data } = await axios.patch(personalToolsRoute(personalToolsId), params);

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default updatePersonalToolsOperation;
