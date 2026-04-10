import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { resumeRoute } from "@/lib/apiRoutes";
import { FETCH_RESUME } from "../types";

type ParamsType = {
  userId: string;
};

const fetchResumeOperation = createAsyncThunk(
  FETCH_RESUME,
  async (params: ParamsType) => {
    const { userId } = params;

    try {
      const { data } = await axios.get(resumeRoute(userId));

      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default fetchResumeOperation;
