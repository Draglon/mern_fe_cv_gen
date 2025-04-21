import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalSkillsRoute } from "@/lib/apiRoutes";
import { UPDATE_PERSONAL_SKILLS } from "../types";

type ParamsType = {
  personalSkillsId: string;
};

const updatePersonalSkillsOperation = createAsyncThunk(
  UPDATE_PERSONAL_SKILLS,
  async (params: ParamsType) => {
    const { personalSkillsId } = params;

    try {
      const { data } = await axios.patch(personalSkillsRoute(personalSkillsId), params);

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default updatePersonalSkillsOperation;
