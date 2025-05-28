import { createAsyncThunk } from "@reduxjs/toolkit";

import getBase64 from "@/utils/getBase64";
import axios from "@/lib/axios.js";
import { personalInfoRoute } from "@/lib/apiRoutes";
import { UPDATE_PERSONAL_INFO } from "../types";

type ParamsType = {
  personalInfoId: string;
  sectionTitle: string;
  locale: string;
  userId: string;
  userUrl?: string | any[];
  firstName: string;
  lastName: string;
  about: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  birthday?: string;
  linkedIn?: string;
};


const createPersonalInfoOperation = createAsyncThunk(
  UPDATE_PERSONAL_INFO,
  async (params: ParamsType) => {
    const userUrl = params?.userUrl ? await getBase64(params.userUrl[0]) : ""; 

    try {
      const { data } = await axios.patch(personalInfoRoute(params.personalInfoId), { ...params, userUrl });
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default createPersonalInfoOperation;
