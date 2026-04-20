import { createSlice } from "@reduxjs/toolkit";

import fetchAuth from "./operations/fetchAuth";
import fetchRegister from "./operations/fetchRegister";
import fetchUser from "./operations/fetchUser";

interface IAuthState {
  data: {
    _id: string;
    avatarUrl: string | null;
    userName: string;
    email: string;
    personalInfoId: string | null;
    personalHobbiesId: string | null;
    personalLanguagesId: string | null;
    personalExperienceId: string | null;
    personalEducationId: string | null;
    personalCoursesId: string | null;
    personalSkillsId: string | null;
    personalToolsId: string | null;
    createdAt?: string;
    updatedAt?: string;
  } | null;
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
  },
});

export default authSlice.reducer;
