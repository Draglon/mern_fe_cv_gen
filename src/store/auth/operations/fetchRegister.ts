import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "@/lib/axios";
import { resumeRoute } from "@/lib/routes";
import { authRegistrationRoute } from "@/lib/apiRoutes";
import { isErrorStatusUnauthorized } from "@/utils/getErrorStatus";
import { FETCH_REGISTER } from "./../types";

type ParamsType = {
  values: {
    username?: string;
    email?: string;
    password?: string;
  }
  form: {
    setError: any;
  };
  router: any;
  locale: any;
  t: any;
};

const fetchRegistrationOperation = createAsyncThunk(
  FETCH_REGISTER,
  async (params: ParamsType) => {
    const { form: { setError }, router, locale, t } = params;

    try {
      const { data } = await axios.post(authRegistrationRoute, params);

      if ("token" in data) {
        localStorage.setItem("token", data.token);
        router.push(resumeRoute, { locale });
      }

      return data;
    } catch (error) {
      console.log("error: ", error);
      if (isErrorStatusUnauthorized(error)) {
        setError("email", {
          type: "manual",
          message: t("form.email.errors.alreadyExists"),
        });
      }
      return error;
    }
  },
);

export default fetchRegistrationOperation;
