import { createSlice } from "@reduxjs/toolkit";

import removeAccount from "./operations/removeAccount";

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
    builder.addCase(removeAccount.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(removeAccount.fulfilled, (state) => {
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(removeAccount.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default settingsSlice.reducer;
