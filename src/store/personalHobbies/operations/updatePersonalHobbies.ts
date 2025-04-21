import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalHobbiesRoute } from "@/lib/apiRoutes";
import { UPDATE_PERSONAL_HOBBIES } from "../types";

type ParamsType = {
  personalHobbiesId: string;
};

const updatePersonalHobbiesOperation = createAsyncThunk(
  UPDATE_PERSONAL_HOBBIES,
  async (params: ParamsType) => {
    const { personalHobbiesId } = params;

    try {
      const { data } = await axios.patch(personalHobbiesRoute(personalHobbiesId), params);

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default updatePersonalHobbiesOperation;
