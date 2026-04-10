import { createSlice } from "@reduxjs/toolkit";

import { Locales } from "@/lib/constants/props/locales";
import createPersonalEducation from "./operations/createPersonalEducation";
import fetchPersonalEducation from "./operations/fetchPersonalEducation";
import updatePersonalEducation from "./operations/updatePersonalEducation";

interface IPersonalEducationState {
  data: {
    sectionTitle?: Locales;
    education?: Locales;
    _id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  status?: string;
}

const initialState: IPersonalEducationState = {
  data: null,
  status: undefined,
};

export const personalEducationSlice = createSlice({
  name: "personalEducation",
  initialState,
  reducers: {},
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
