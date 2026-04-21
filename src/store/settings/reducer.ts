import { createSlice } from "@reduxjs/toolkit";

import deleteAccount from "./operations/deleteAccount";

interface ISettingsState {
  status?: string;
  error?: any;
}

const initialState: ISettingsState = {
  status: undefined,
  error: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteAccount.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default settingsSlice.reducer;
