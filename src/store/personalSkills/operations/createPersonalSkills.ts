import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalSkillsCreateRoute } from "@/lib/apiRoutes";
import { CREATE_PERSONAL_SKILLS } from "./../types";

type ParamsType = {
  locale: string;
  userId: string;
  skills: {
    skill: string;
    level: string;
    visible: boolean;
  }[];
};

const createPersonalSkillsOperation = createAsyncThunk(
  CREATE_PERSONAL_SKILLS,
  async (params: ParamsType) => {
    try {
      const { data } = await axios.post(personalSkillsCreateRoute, params);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default createPersonalSkillsOperation;
