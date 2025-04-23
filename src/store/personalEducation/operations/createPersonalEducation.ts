import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalEducationCreateRoute } from "@/lib/apiRoutes";
import { CREATE_PERSONAL_EDUCATION } from "./../types";

type ParamsType = {
  locale: string;
  userId: string;
  education: {
    institute: string;
    degree: string;
    faculty: string;
    specialization: string;
    startDate: string;
    endDate: string;
  }[];
};

const createPersonalEducationOperation = createAsyncThunk(
  CREATE_PERSONAL_EDUCATION,
  async (params: ParamsType) => {
    try {
      const { data } = await axios.post(personalEducationCreateRoute, params);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default createPersonalEducationOperation;
