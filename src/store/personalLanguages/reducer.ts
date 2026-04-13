import { createSlice } from "@reduxjs/toolkit";

import { PersonalLanguagesProps } from "@/lib/constants/props/resume";
import createPersonalLanguages from "./operations/createPersonalLanguages";
import fetchPersonalLanguages from "./operations/fetchPersonalLanguages";
import updatePersonalLanguages from "./operations/updatePersonalLanguages";

interface IPersonalLanguagesState {
  data: PersonalLanguagesProps | null;
  status?: string;
}

const initialState: IPersonalLanguagesState = {
  data: null,
  status: undefined,
};

export const personalLanguagesSlice = createSlice({
  name: "personalLanguages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPersonalLanguages.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(createPersonalLanguages.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(createPersonalLanguages.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchPersonalLanguages.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchPersonalLanguages.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchPersonalLanguages.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(updatePersonalLanguages.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(updatePersonalLanguages.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(updatePersonalLanguages.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export default personalLanguagesSlice.reducer;
