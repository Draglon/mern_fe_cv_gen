import { createSlice } from "@reduxjs/toolkit";

import createPersonalEducation from "./operations/createPersonalEducation";
import fetchPersonalEducation from "./operations/fetchPersonalEducation";
import updatePersonalEducation from "./operations/updatePersonalEducation";

const initialState = {
  data: null,
  status: undefined,
};

export const personalEducationSlice = createSlice({
  name: "personalEducation",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createPersonalEducation.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(createPersonalEducation.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(createPersonalEducation.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchPersonalEducation.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchPersonalEducation.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchPersonalEducation.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(updatePersonalEducation.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(updatePersonalEducation.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(updatePersonalEducation.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export default personalEducationSlice.reducer;
