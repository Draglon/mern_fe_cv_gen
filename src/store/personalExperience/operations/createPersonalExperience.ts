import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalExperienceCreateRoute } from "@/lib/apiRoutes";
import { CREATE_PERSONAL_EXPERIENCE } from "./../types";

type ParamsType = {
  locale: string;
  userId: string;
  experience: {
    position: string;
    companyName: string;
    location: string;
    placeOfWork: string;
    workingTime: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string,
  }[];
};

const createPersonalExperienceOperation = createAsyncThunk(
  CREATE_PERSONAL_EXPERIENCE,
  async (params: ParamsType) => {
    try {
      const { data } = await axios.post(personalExperienceCreateRoute, params);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default createPersonalExperienceOperation;
