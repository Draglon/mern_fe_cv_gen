import { createSlice } from "@reduxjs/toolkit";

import fetchAuth from "./operations/fetchAuth";
import fetchRegister from "./operations/fetchRegister";
import fetchUser from "./operations/fetchUser";
import updateUserResume from "./operations/updateUserResume";
import updateUserProfile from "./operations/updateUserProfile";
import updateUserEmail from "./operations/updateUserEmail";
import deleteAccount from "./operations/deleteAccount";

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
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updateUserResume.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateUserResume.fulfilled, (state, action) => {
      console.log("state.data: ", state.data);
      console.log("action.payload: ", action.payload);
      state.data = {
        ...state.data,
        ...action.payload,
      };
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updateUserResume.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updateUserProfile.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updateUserEmail.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateUserEmail.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updateUserEmail.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

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

export default authSlice.reducer;
