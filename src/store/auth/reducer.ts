import { createSlice } from "@reduxjs/toolkit";

import fetchAuth from "./operations/fetchAuth";
import fetchRegister from "./operations/fetchRegister";
import fetchUser from "./operations/fetchUser";
import updateUserEmail from "./operations/updateUserEmail";

interface IAuthState {
  data: any | null;
  status?: string;
  error: any,
}

const initialState: IAuthState = {
  data: null,
  status: undefined,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.data = initialState.data;
      state.status = initialState.status;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updateUserEmail.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateUserEmail.fulfilled, (state, action) => {
      state.data = { ...state.data, email: action.payload.email };
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updateUserEmail.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
