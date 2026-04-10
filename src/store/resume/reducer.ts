import { createSlice } from "@reduxjs/toolkit";

import fetchResume from "./operations/fetchResume";

interface IResumeState {
  data?: {
    personalInfo: any;
    personalHobbies: any;
    personalLanguages: any;
    personalExperience: any;
    personalEducation: any;
    personalCourses: any;
    personalSkills: any;
    personalTools: any;
  } | null;
  status?: string;
}

const initialState: IResumeState = {
  data: null,
  status: undefined,
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {},
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
