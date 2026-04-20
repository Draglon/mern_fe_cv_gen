import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { resumeRoute } from "@/lib/routes";
import { authLoginRoute } from "@/lib/apiRoutes";
import { FETCH_LOGIN } from "./../types";

type ParamsType = {
  values: {
    email?: string;
    password?: string;
  };
  router: any;
  locale: any;
};

const fetchAuthOperation = createAsyncThunk(
  FETCH_LOGIN,
  async (params: ParamsType, { rejectWithValue }) => {
    const { values, router, locale } = params;
    try {
      const { data } = await axios.post(authLoginRoute, values);

      if ("token" in data) {
        localStorage.setItem("token", data.token);
        router.push(resumeRoute, { locale });
      }

      return data;
    } catch (error: any) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default fetchAuthOperation;
