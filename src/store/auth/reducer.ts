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
}

const initialState: IAuthState = {
  data: null,
  status: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export default authSlice.reducer;
