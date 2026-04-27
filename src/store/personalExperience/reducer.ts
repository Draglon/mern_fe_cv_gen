import { createSlice } from "@reduxjs/toolkit";

import { PersonalExperienceProps } from "@/lib/constants/props/resume";
import createPersonalExperience from "./operations/createPersonalExperience";
import fetchPersonalExperience from "./operations/fetchPersonalExperience";
import updatePersonalExperience from "./operations/updatePersonalExperience";

interface IPersonalExperienceState {
  data: PersonalExperienceProps | null;
  status?: string;
  error: unknown | null;
}

const initialState: IPersonalExperienceState = {
  data: null,
  status: undefined,
  error: null,
};

export const personalExperienceSlice = createSlice({
  name: "personalExperience",
  initialState,
  reducers: {
    resetPersonalExperience: state => {
      state.data = initialState.data;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPersonalExperience.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createPersonalExperience.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(createPersonalExperience.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchPersonalExperience.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPersonalExperience.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchPersonalExperience.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updatePersonalExperience.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePersonalExperience.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updatePersonalExperience.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default personalExperienceSlice.reducer;
