import { createSlice } from "@reduxjs/toolkit";

import { PersonalEducationProps } from "@/lib/constants/props/resume";
import createPersonalEducation from "./operations/createPersonalEducation";
import fetchPersonalEducation from "./operations/fetchPersonalEducation";
import updatePersonalEducation from "./operations/updatePersonalEducation";

interface IPersonalEducationState {
  data: PersonalEducationProps | null;
  status?: string;
  error: unknown | null;
}

const initialState: IPersonalEducationState = {
  data: null,
  status: undefined,
  error: null,
};

export const personalEducationSlice = createSlice({
  name: "personalEducation",
  initialState,
  reducers: {
    resetPersonalEducation: state => {
      state.data = initialState.data;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPersonalEducation.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createPersonalEducation.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(createPersonalEducation.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchPersonalEducation.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPersonalEducation.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchPersonalEducation.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updatePersonalEducation.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePersonalEducation.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updatePersonalEducation.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default personalEducationSlice.reducer;
