import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UploadFile } from "antd/es/upload/interface";

import axios from "@/lib/axios";
import { personalInfoCreateRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_INFO } from "./../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    sectionTitle?: string;
    userUrl?: UploadFile[];
    firstName: string;
    lastName: string;
    aboutMe: string;
    email: string;
    address: string;
    phoneNumber: string;
    birthday: string;
    linkedIn?: string;
    telegram?: string;
    portfolio?: string;
  };
  locale: Locales;
};

const createPersonalInfoOperation = createAsyncThunk(
  CREATE_PERSONAL_INFO,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
        userId,
      };

      const { data } = await axios.post(personalInfoCreateRoute, formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalInfoOperation;
