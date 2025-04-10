import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalCoursesCreateRoute } from "@/lib/apiRoutes";
import { CREATE_PERSONAL_COURSES } from "./../types";

type ParamsType = {
  locale: string;
  userId: string;
  courses: {
    course: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
};

const createPersonalCoursesOperation = createAsyncThunk(
  CREATE_PERSONAL_COURSES,
  async (params: ParamsType) => {
    try {
      const { data } = await axios.post(personalCoursesCreateRoute, params);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default createPersonalCoursesOperation;
