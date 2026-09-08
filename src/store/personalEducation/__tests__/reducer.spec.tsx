import {
  ParamsType,
  FieldType,
} from "@/lib/constants/props/resume/personalEducation";

import createPersonalEducation from "../operations/createPersonalEducation";
import fetchPersonalEducation from "../operations/fetchPersonalEducation";
import updatePersonalEducation from "../operations/updatePersonalEducation";

import personalEducationReducer, { personalEducationSlice } from "../reducer";

describe("personalEducationSlice", () => {
  const initialState = {
    data: null,
    status: undefined,
    error: null,
  };

  const values: FieldType = {
    sectionTitle: "",
    education: [
      {
        institute: "University",
        degree: "Bachelor",
        faculty: "Computer Science",
        specialization: "Software Engineering",
        startDate: "2020-09-01",
        endDate: "2024-06-30",
        isCurrent: false,
      },
    ],
  };

  const params: ParamsType = {
    values,
    locale: "en",
    resumeLocale: "en",
  };

  const data = {
    sectionTitle: {
      en: "Education",
      ua: "",
      ru: "",
    },
    education: {
      en: [
        {
          institute: "University",
          degree: "Bachelor",
          faculty: "Computer Science",
          specialization: "Software Engineering",
          startDate: "2020-09-01",
          endDate: "2024-06-30",
          isCurrent: false,
        },
      ],
      ua: [],
      ru: [],
    },
  };

  const rejectedError = new Error("Something went wrong");

  describe("resetPersonalEducation", () => {
    it("should reset state to initial values", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      const action = personalEducationSlice.actions.resetPersonalEducation();

      expect(personalEducationReducer(state, action)).toEqual(initialState);
    });
  });

  describe("createPersonalEducation", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalEducationReducer(
          state,
          createPersonalEducation.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalEducationReducer(
          initialState,
          createPersonalEducation.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: createPersonalEducation.rejected.type,
        payload: rejectedError,
      };

      expect(personalEducationReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });

  describe("fetchPersonalEducation", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalEducationReducer(
          state,
          fetchPersonalEducation.pending("request-id")
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalEducationReducer(
          initialState,
          fetchPersonalEducation.fulfilled(data, "request-id")
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: fetchPersonalEducation.rejected.type,
        payload: rejectedError,
      };

      expect(personalEducationReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });

  describe("updatePersonalEducation", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalEducationReducer(
          state,
          updatePersonalEducation.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalEducationReducer(
          initialState,
          updatePersonalEducation.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: updatePersonalEducation.rejected.type,
        payload: rejectedError,
      };

      expect(personalEducationReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });
});
