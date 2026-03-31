import { createSlice } from "@reduxjs/toolkit";

import fetchResume from "./operations/fetchResume";

const initialState = {
  data: null,
  status: undefined,
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchResume.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchResume.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchResume.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export default resumeSlice.reducer;
