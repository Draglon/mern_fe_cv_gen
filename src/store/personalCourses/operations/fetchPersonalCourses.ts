import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalCoursesRoute } from "@/lib/apiRoutes";
import { FETCH_PERSONAL_COURSES } from "../types";

type ParamsType = {
  id: string;
};

const fetchPersonalCoursesOperation = createAsyncThunk(
  FETCH_PERSONAL_COURSES,
  async (params: ParamsType) => {
    const { id } = params;

    try {
      const { data } = await axios.get(personalCoursesRoute(id));

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchPersonalCoursesOperation;
