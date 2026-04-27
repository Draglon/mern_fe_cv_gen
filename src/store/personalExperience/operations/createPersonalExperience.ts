import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalExperienceCreateRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import { userIdSelector } from "@/store/auth/selectors";
import { CREATE_PERSONAL_EXPERIENCE } from "./../types";
import { RootState } from '../../store';

type ParamsType = {
  values: {
    sectionTitle?: string,
    lastPlacesOfWorks?: number | string;
    experience: {
      position: string;
      companyName: string;
      location: string;
      placeOfWork: string;
      workingTime: string;
      startDate: string;
      endDate: string;
      description: string;
      skills: string,
    }[];
  };
  locale: Locales;
};

const createPersonalExperienceOperation = createAsyncThunk(
  CREATE_PERSONAL_EXPERIENCE,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
        userId
      };

      const { data } = await axios.post(personalExperienceCreateRoute, formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default createPersonalExperienceOperation;
