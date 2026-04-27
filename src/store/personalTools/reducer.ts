import { createSlice } from "@reduxjs/toolkit";

import { PersonalToolsProps } from "@/lib/constants/props/resume";
import createPersonalTools from "./operations/createPersonalTools";
import fetchPersonalTools from "./operations/fetchPersonalTools";
import updatePersonalTools from "./operations/updatePersonalTools";

interface IPersonalToolsState {
  data: PersonalToolsProps | null;
  status?: string;
  error: unknown | null;
}

const initialState: IPersonalToolsState = {
  data: null,
  status: undefined,
  error: null,
};

export const personalToolsSlice = createSlice({
  name: "personalTools",
  initialState,
  reducers: {
    resetPersonalTools: state => {
      state.data = initialState.data;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPersonalTools.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createPersonalTools.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(createPersonalTools.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchPersonalTools.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPersonalTools.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchPersonalTools.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updatePersonalTools.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePersonalTools.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updatePersonalTools.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default personalToolsSlice.reducer;
