import { createSlice } from "@reduxjs/toolkit";

import createPersonalSkills from "./operations/createPersonalSkills";
import fetchPersonalSkills from "./operations/fetchPersonalSkills";
import updatePersonalSkills from "./operations/updatePersonalSkills";

const initialState = {
  data: null,
  status: undefined,
};

export const personalSkillsSlice = createSlice({
  name: "personalSkills",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createPersonalSkills.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(createPersonalSkills.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(createPersonalSkills.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchPersonalSkills.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchPersonalSkills.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchPersonalSkills.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(updatePersonalSkills.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(updatePersonalSkills.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(updatePersonalSkills.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export default personalSkillsSlice.reducer;
