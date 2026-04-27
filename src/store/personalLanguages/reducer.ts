import { createSlice } from "@reduxjs/toolkit";

import { PersonalLanguagesProps } from "@/lib/constants/props/resume";
import createPersonalLanguages from "./operations/createPersonalLanguages";
import fetchPersonalLanguages from "./operations/fetchPersonalLanguages";
import updatePersonalLanguages from "./operations/updatePersonalLanguages";

interface IPersonalLanguagesState {
  data: PersonalLanguagesProps | null;
  status?: string;
  error: unknown | null;
}

const initialState: IPersonalLanguagesState = {
  data: null,
  status: undefined,
  error: null,
};

export const personalLanguagesSlice = createSlice({
  name: "personalLanguages",
  initialState,
  reducers: {
    resetPersonalLanguages: state => {
      state.data = initialState.data;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPersonalLanguages.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createPersonalLanguages.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(createPersonalLanguages.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchPersonalLanguages.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPersonalLanguages.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchPersonalLanguages.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updatePersonalLanguages.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePersonalLanguages.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updatePersonalLanguages.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default personalLanguagesSlice.reducer;
