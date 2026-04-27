import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalSkillsRoute } from "@/lib/apiRoutes";
import { personalSkillsIdSelector } from "@/store/auth/selectors";
import { FETCH_PERSONAL_SKILLS } from "../types";
import { RootState } from '../../store';

const fetchPersonalSkillsOperation = createAsyncThunk(
  FETCH_PERSONAL_SKILLS,
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const personalSkillsId = personalSkillsIdSelector(state);

      const { data } = await axios.get(personalSkillsRoute(personalSkillsId));

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchPersonalSkillsOperation;
