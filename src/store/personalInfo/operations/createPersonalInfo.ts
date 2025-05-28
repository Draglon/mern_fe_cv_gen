import { createAsyncThunk } from "@reduxjs/toolkit";

import getBase64 from "@/utils/getBase64";
import axios from "@/lib/axios.js";
import { personalInfoCreateRoute } from "@/lib/apiRoutes";
import { CREATE_PERSONAL_INFO } from "./../types";

type ParamsType = {
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
  CREATE_PERSONAL_INFO,
  async (params: ParamsType) => {
    const userUrl = params?.userUrl ? await getBase64(params.userUrl[0]) : "";

    try {
      const { data } = await axios.post(personalInfoCreateRoute, { ...params, userUrl });
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  },
);

export default createPersonalInfoOperation;
