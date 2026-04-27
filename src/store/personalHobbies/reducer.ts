import { createSlice } from "@reduxjs/toolkit";

import { PersonalHobbiesProps } from "@/lib/constants/props/resume";
import createPersonalHobbies from "./operations/createPersonalHobbies";
import fetchPersonalHobbies from "./operations/fetchPersonalHobbies";
import updatePersonalHobbies from "./operations/updatePersonalHobbies";

interface IPersonalHobbiesState {
  data: PersonalHobbiesProps | null;
  status?: string;
  error: unknown | null;
}

const initialState: IPersonalHobbiesState = {
  data: null,
  status: undefined,
  error: null,
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
      state.error = null;
    });
    builder.addCase(createPersonalHobbies.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(createPersonalHobbies.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchPersonalHobbies.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchPersonalHobbies.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(fetchPersonalHobbies.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(updatePersonalHobbies.pending, (state) => {
      state.data = null;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updatePersonalHobbies.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.error = null;
    });
    builder.addCase(updatePersonalHobbies.rejected, (state, action) => {
      state.data = null;
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default personalHobbiesSlice.reducer;
