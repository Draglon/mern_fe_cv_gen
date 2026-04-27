import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UploadFile } from "antd/es/upload/interface";

import axios from "@/lib/axios";
import { personalInfoRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import {
  userIdSelector,
  personalInfoIdSelector,
} from "@/store/auth/selectors";
import { UPDATE_PERSONAL_INFO } from "../types";
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

const updatePersonalInfoOperation = createAsyncThunk(
  UPDATE_PERSONAL_INFO,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const personalInfoId = personalInfoIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
        userId,
      };

      const { data } = await axios.patch(personalInfoRoute(personalInfoId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalInfoOperation;
