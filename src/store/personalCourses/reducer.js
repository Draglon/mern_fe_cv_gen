import { createSlice } from "@reduxjs/toolkit";

import createPersonalCourses from "./operations/createPersonalCourses";
import fetchPersonalCourses from "./operations/fetchPersonalCourses";
import updatePersonalCourses from "./operations/updatePersonalCourses";

const initialState = {
  data: null,
  status: undefined,
};

export const personalCoursesSlice = createSlice({
  name: "personalCourses",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createPersonalCourses.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(createPersonalCourses.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(createPersonalCourses.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchPersonalCourses.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchPersonalCourses.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchPersonalCourses.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(updatePersonalCourses.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(updatePersonalCourses.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(updatePersonalCourses.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export default personalCoursesSlice.reducer;
