import { createSlice } from "@reduxjs/toolkit";

import { PersonalCoursesProps } from "@/lib/constants/props/resume";
import createPersonalCourses from "./operations/createPersonalCourses";
import fetchPersonalCourses from "./operations/fetchPersonalCourses";
import updatePersonalCourses from "./operations/updatePersonalCourses";

interface IPersonalCoursesState {
  data: PersonalCoursesProps | null;
  status?: string;
  error: unknown | null;
}

const initialState: IPersonalCoursesState = {
  data: null,
  status: undefined,
  error: null,
};

export const personalCoursesSlice = createSlice({
  name: "personalCourses",
  initialState,
  reducers: {
    resetPersonalCourses: state => {
      state.data = initialState.data;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPersonalCourses.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createPersonalCourses.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(createPersonalCourses.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchPersonalCourses.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPersonalCourses.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchPersonalCourses.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updatePersonalCourses.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePersonalCourses.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updatePersonalCourses.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default personalCoursesSlice.reducer;
