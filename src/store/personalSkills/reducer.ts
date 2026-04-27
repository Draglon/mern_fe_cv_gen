import { createSlice } from "@reduxjs/toolkit";

import { PersonalSkillsProps } from "@/lib/constants/props/resume";
import createPersonalSkills from "./operations/createPersonalSkills";
import fetchPersonalSkills from "./operations/fetchPersonalSkills";
import updatePersonalSkills from "./operations/updatePersonalSkills";

interface IPersonalSkillsState {
  data: PersonalSkillsProps | null;
  status?: string;
  error: unknown | null;
}

const initialState: IPersonalSkillsState = {
  data: null,
  status: undefined,
  error: null,
};

export const personalSkillsSlice = createSlice({
  name: "personalSkills",
  initialState,
  reducers: {
    resetPersonalSkills: state => {
      state.data = initialState.data;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPersonalSkills.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createPersonalSkills.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(createPersonalSkills.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchPersonalSkills.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPersonalSkills.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchPersonalSkills.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updatePersonalSkills.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePersonalSkills.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updatePersonalSkills.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default personalSkillsSlice.reducer;
