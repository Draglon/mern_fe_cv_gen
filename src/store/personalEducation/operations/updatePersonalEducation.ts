import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalEducationRoute } from "@/lib/apiRoutes";
import { UPDATE_PERSONAL_EDUCATION } from "../types";

type ParamsType = {
  personalEducationId: string;
};

const updatePersonalEducationOperation = createAsyncThunk(
  UPDATE_PERSONAL_EDUCATION,
  async (params: ParamsType) => {
    const { personalEducationId } = params;

    try {
      const { data } = await axios.patch(personalEducationRoute(personalEducationId), params);

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default updatePersonalEducationOperation;
