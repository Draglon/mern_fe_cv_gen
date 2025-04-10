import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalSkillsRoute } from "@/lib/apiRoutes";
import { FETCH_PERSONAL_SKILLS } from "../types";

type ParamsType = {
  id: string;
};

const fetchPersonalSkillsOperation = createAsyncThunk(
  FETCH_PERSONAL_SKILLS,
  async (params: ParamsType) => {
    const { id } = params;

    try {
      const { data } = await axios.get(personalSkillsRoute(id));

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchPersonalSkillsOperation;
