import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { resumeRoute } from "@/lib/apiRoutes";
import { ParamsType } from "@/lib/constants/props/resume";
import { FETCH_RESUME } from "../types";

const fetchResumeOperation = createAsyncThunk(
  FETCH_RESUME,
  async (params: ParamsType, { rejectWithValue }) => {
    const { userId } = params;

    try {
      const { data } = await axios.get(resumeRoute(userId));

      return data;
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchResumeOperation;
