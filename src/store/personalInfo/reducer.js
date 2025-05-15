import { createSlice } from "@reduxjs/toolkit";

import createPersonalInfo from "./operations/createPersonalInfo";
import fetchPersonalInfo from "./operations/fetchPersonalInfo";
import updatePersonalInfo from "./operations/updatePersonalInfo";

const initialState = {
  data: null,
  status: undefined,
};

export const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createPersonalInfo.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(createPersonalInfo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(createPersonalInfo.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchPersonalInfo.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchPersonalInfo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchPersonalInfo.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(updatePersonalInfo.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(updatePersonalInfo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(updatePersonalInfo.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export default personalInfoSlice.reducer;
