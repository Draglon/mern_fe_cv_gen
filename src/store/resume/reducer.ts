import { createSlice } from "@reduxjs/toolkit";

import { ResumeProps } from "@/lib/constants/props/resume";

import fetchResume from "./operations/fetchResume";

interface IResumeState {
  data: ResumeProps | null;
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
