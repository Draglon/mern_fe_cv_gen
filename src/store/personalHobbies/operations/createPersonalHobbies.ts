import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalHobbiesCreateRoute } from "@/lib/apiRoutes";
import { CREATE_PERSONAL_HOBBIES } from "./../types";

type ParamsType = {
  locale: string;
  userId: string;
  hobbies: {
    hobby: string;
  }[];
};

const createPersonalHobbiesOperation = createAsyncThunk(
  CREATE_PERSONAL_HOBBIES,
  async (params: ParamsType) => {
    try {
      const { data } = await axios.post(personalHobbiesCreateRoute, params);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default createPersonalHobbiesOperation;
