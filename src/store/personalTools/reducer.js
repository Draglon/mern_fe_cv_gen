import { createSlice } from "@reduxjs/toolkit";

import createPersonalTools from "./operations/createPersonalTools";
import fetchPersonalTools from "./operations/fetchPersonalTools";
import updatePersonalTools from "./operations/updatePersonalTools";

const initialState = {
  data: null,
  status: undefined,
};

export const personalToolsSlice = createSlice({
  name: "personalTools",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createPersonalTools.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(createPersonalTools.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(createPersonalTools.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchPersonalTools.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchPersonalTools.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchPersonalTools.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(updatePersonalTools.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(updatePersonalTools.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(updatePersonalTools.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export default personalToolsSlice.reducer;
