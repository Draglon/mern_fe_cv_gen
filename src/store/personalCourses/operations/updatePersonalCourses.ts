import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios.js";
import { personalCoursesRoute } from "@/lib/apiRoutes";
import { UPDATE_PERSONAL_COURSES } from "../types";

type ParamsType = {
  personalCoursesId: string;
};

const updatePersonalCoursesOperation = createAsyncThunk(
  UPDATE_PERSONAL_COURSES,
  async (params: ParamsType) => {
    const { personalCoursesId } = params;

    try {
      const { data } = await axios.patch(personalCoursesRoute(personalCoursesId), params);

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default updatePersonalCoursesOperation;
