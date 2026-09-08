import {
  ParamsType,
  FieldType,
} from "@/lib/constants/props/resume/personalCourses";

import createPersonalCourses from "../operations/createPersonalCourses";
import fetchPersonalCourses from "../operations/fetchPersonalCourses";
import updatePersonalCourses from "../operations/updatePersonalCourses";

import personalCoursesReducer, { personalCoursesSlice } from "../reducer";

describe("personalCoursesSlice", () => {
  const initialState = {
    data: null,
    status: undefined,
    error: null,
  };

  const values: FieldType = {
    sectionTitle: "",
    courses: [
      {
        course: "Course",
        description: "Description",
        startDate: "2026-02-24",
        endDate: "2027-02-24",
        isCurrent: true,
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
      en: "Title",
      ua: "",
      ru: "",
    },
    courses: {
      en: [
        {
          course: "Course",
          description: "Description",
          startDate: "2026-02-24",
          endDate: "2027-02-28",
          isCurrent: true,
        },
      ],
      ua: [],
      ru: [],
    },
  };

  const rejectedError = new Error("Something went wrong");

  describe("resetPersonalCourses", () => {
    it("should reset state to initial values", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      const action = personalCoursesSlice.actions.resetPersonalCourses();

      expect(personalCoursesReducer(state, action)).toEqual(initialState);
    });
  });

  describe("createPersonalCourses", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalCoursesReducer(
          state,
          createPersonalCourses.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalCoursesReducer(
          initialState,
          createPersonalCourses.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: createPersonalCourses.rejected.type,
        payload: rejectedError,
      };

      expect(personalCoursesReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });

  describe("fetchPersonalCourses", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalCoursesReducer(
          state,
          fetchPersonalCourses.pending("request-id")
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalCoursesReducer(
          initialState,
          fetchPersonalCourses.fulfilled(data, "request-id")
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: fetchPersonalCourses.rejected.type,
        payload: rejectedError,
      };

      expect(personalCoursesReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });

  describe("updatePersonalCourses", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalCoursesReducer(
          state,
          updatePersonalCourses.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalCoursesReducer(
          initialState,
          updatePersonalCourses.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: updatePersonalCourses.rejected.type,
        payload: rejectedError,
      };

      expect(personalCoursesReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });
});
