import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { personalExperienceRoute } from "@/lib/apiRoutes";
import { Locales } from "@/lib/constants/props/locales";
import { userIdSelector, personalExperienceIdSelector } from "@/store/auth/selectors";
import { UPDATE_PERSONAL_EXPERIENCE } from "../types";
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


const updatePersonalExperienceOperation = createAsyncThunk(
  UPDATE_PERSONAL_EXPERIENCE,
  async (params: ParamsType, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = userIdSelector(state);
      const personalExperienceId = personalExperienceIdSelector(state);
      const { values, locale } = params;
      const formattedParams = {
        ...values,
        locale,
        userId
      };

      const { data } = await axios.patch(personalExperienceRoute(personalExperienceId), formattedParams);

      return data;
    } catch (error: unknown) {
      console.log("error: ", error);
      return rejectWithValue(error);
    }
  },
);

export default updatePersonalExperienceOperation;
