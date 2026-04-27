import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalToolsRoute } from "@/lib/apiRoutes";
import { personalToolsIdSelector } from "@/store/auth/selectors";
import { FETCH_PERSONAL_TOOLS } from "../types";
import { RootState } from '../../store';

const fetchPersonalToolsOperation = createAsyncThunk(
  FETCH_PERSONAL_TOOLS,
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalToolsId = personalToolsIdSelector(state);

      const { data } = await axios.get(personalToolsRoute(personalToolsId));

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchPersonalToolsOperation;
