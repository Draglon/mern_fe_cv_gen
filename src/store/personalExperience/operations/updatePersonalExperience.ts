import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalExperienceRoute } from "@/lib/apiRoutes";
import { UPDATE_PERSONAL_EXPERIENCE } from "../types";

type ParamsType = {
  personalExperienceId: string;
};

const updatePersonalExperienceOperation = createAsyncThunk(
  UPDATE_PERSONAL_EXPERIENCE,
  async (params: ParamsType) => {
    const { personalExperienceId } = params;

    try {
      const { data } = await axios.patch(personalExperienceRoute(personalExperienceId), params);

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default updatePersonalExperienceOperation;
