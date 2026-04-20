import { createSlice } from "@reduxjs/toolkit";

import { PersonalHobbiesProps } from "@/lib/constants/props/resume";
import createPersonalHobbies from "./operations/createPersonalHobbies";
import fetchPersonalHobbies from "./operations/fetchPersonalHobbies";
import updatePersonalHobbies from "./operations/updatePersonalHobbies";

interface IPersonalHobbiesState {
  data: PersonalHobbiesProps | null;
  status?: string;
}

const initialState: IPersonalHobbiesState = {
  data: null,
  status: undefined,
};

export const personalHobbiesSlice = createSlice({
  name: "personalHobbies",
  initialState,
  reducers: {
    resetPersonalHobbies: state => {
      state.data = initialState.data;
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPersonalHobbies.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(createPersonalHobbies.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(createPersonalHobbies.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchPersonalHobbies.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(fetchPersonalHobbies.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchPersonalHobbies.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(updatePersonalHobbies.pending, (state) => {
      state.data = null;
      state.status = "loading";
    });
    builder.addCase(updatePersonalHobbies.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(updatePersonalHobbies.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export default personalHobbiesSlice.reducer;
