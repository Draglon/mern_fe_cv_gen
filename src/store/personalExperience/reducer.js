import { createSlice } from "@reduxjs/toolkit";

import createPersonalExperience from "./operations/createPersonalExperience";
import fetchPersonalExperience from "./operations/fetchPersonalExperience";

const initialState = {
  data: null,
  status: "loading",
};

export const personalExperienceSlice = createSlice({
  name: "personalExperience",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createPersonalExperience.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(createPersonalExperience.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(createPersonalExperience.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchPersonalExperience.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchPersonalExperience.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchPersonalExperience.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export default personalExperienceSlice.reducer;
