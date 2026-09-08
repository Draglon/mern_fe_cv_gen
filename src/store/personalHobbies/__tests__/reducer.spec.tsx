import { PersonalHobbiesProps } from "@/lib/constants/props/resume";
import {
  ParamsType,
  FieldType,
} from "@/lib/constants/props/resume/personalHobbies";

import createPersonalHobbies from "../operations/createPersonalHobbies";
import fetchPersonalHobbies from "../operations/fetchPersonalHobbies";
import updatePersonalHobbies from "../operations/updatePersonalHobbies";

import personalHobbiesReducer, { personalHobbiesSlice } from "../reducer";

describe("personalHobbiesSlice", () => {
  const initialState = {
    data: null,
    status: undefined,
    error: null,
  };

  const values: FieldType = {
    sectionTitle: "",
    hobbies: [{ hobby: "hobby 1" }, { hobby: "hobby 2" }],
  };

  const params: ParamsType = {
    values,
    locale: "en",
    resumeLocale: "en",
  };

  const data: PersonalHobbiesProps = {
    sectionTitle: {
      en: "Hobbies",
      ua: "Хобі",
      ru: "Хобби",
    },
    hobbies: {
      en: [{ hobby: "Reading" }, { hobby: "Traveling" }],
      ua: [],
      ru: [],
    },
  };

  const rejectedError = new Error("Something went wrong");

  describe("resetPersonalHobbies", () => {
    it("should reset state to initial values", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      const action = personalHobbiesSlice.actions.resetPersonalHobbies();

      expect(personalHobbiesReducer(state, action)).toEqual(initialState);
    });
  });

  describe("createPersonalHobbies", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalHobbiesReducer(
          state,
          createPersonalHobbies.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalHobbiesReducer(
          initialState,
          createPersonalHobbies.fulfilled(data, "request-id", {} as never)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: createPersonalHobbies.rejected.type,
        payload: rejectedError,
      };

      expect(personalHobbiesReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });

  describe("fetchPersonalHobbies", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalHobbiesReducer(
          state,
          fetchPersonalHobbies.pending("request-id")
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalHobbiesReducer(
          initialState,
          fetchPersonalHobbies.fulfilled(data, "request-id")
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: fetchPersonalHobbies.rejected.type,
        payload: rejectedError,
      };

      expect(personalHobbiesReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });

  describe("updatePersonalHobbies", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalHobbiesReducer(
          state,
          updatePersonalHobbies.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalHobbiesReducer(
          initialState,
          updatePersonalHobbies.fulfilled(data, "request-id", {} as never)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: updatePersonalHobbies.rejected.type,
        payload: rejectedError,
      };

      expect(personalHobbiesReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });
});
