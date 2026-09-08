import { PersonalLanguagesProps } from "@/lib/constants/props/resume";
import {
  ParamsType,
  FieldType,
} from "@/lib/constants/props/resume/personalLanguages";

import createPersonalLanguages from "../operations/createPersonalLanguages";
import fetchPersonalLanguages from "../operations/fetchPersonalLanguages";
import updatePersonalLanguages from "../operations/updatePersonalLanguages";

import personalLanguagesReducer, { personalLanguagesSlice } from "../reducer";

describe("personalLanguagesSlice", () => {
  const data: PersonalLanguagesProps = {
    sectionTitle: {
      en: "Languages",
      ua: "Мови",
      ru: "Языки",
    },
    languages: {
      en: [
        {
          language: "English",
          level: "upperIntermediate",
        },
      ],
      ua: [
        {
          language: "Ukrainian",
          level: "native",
        },
      ],
      ru: [],
    },
  };

  const values: FieldType = {
    sectionTitle: "",
    languages: [
      {
        language: "English",
        level: "upperIntermediate",
      },
    ],
  };

  const params: ParamsType = {
    values,
    locale: "en",
    resumeLocale: "en",
  };

  const state: Parameters<typeof personalLanguagesReducer>[0] = {
    data,
    status: "loaded",
    error: null,
  };

  describe("resetPersonalLanguages", () => {
    it("should reset state", () => {
      expect(
        personalLanguagesReducer(
          state,
          personalLanguagesSlice.actions.resetPersonalLanguages()
        )
      ).toEqual({
        data: null,
        status: undefined,
        error: null,
      });
    });
  });

  describe("createPersonalLanguages", () => {
    it("should set loading state on pending", () => {
      expect(
        personalLanguagesReducer(
          state,
          createPersonalLanguages.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set loaded state with data on fulfilled", () => {
      expect(
        personalLanguagesReducer(
          state,
          createPersonalLanguages.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should set error state on rejected", () => {
      const error = "Create languages error";

      expect(
        personalLanguagesReducer(state, {
          type: createPersonalLanguages.rejected.type,
          payload: error,
        })
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });

  describe("fetchPersonalLanguages", () => {
    it("should set loading state on pending", () => {
      expect(
        personalLanguagesReducer(
          state,
          fetchPersonalLanguages.pending("request-id")
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set loaded state with data on fulfilled", () => {
      expect(
        personalLanguagesReducer(
          state,
          fetchPersonalLanguages.fulfilled(data, "request-id")
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should set error state on rejected", () => {
      const error = "Fetch languages error";

      expect(
        personalLanguagesReducer(state, {
          type: fetchPersonalLanguages.rejected.type,
          payload: error,
        })
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });

  describe("updatePersonalLanguages", () => {
    it("should set loading state on pending", () => {
      expect(
        personalLanguagesReducer(
          state,
          updatePersonalLanguages.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set loaded state with data on fulfilled", () => {
      expect(
        personalLanguagesReducer(
          state,
          updatePersonalLanguages.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should set error state on rejected", () => {
      const error = "Update languages error";

      expect(
        personalLanguagesReducer(state, {
          type: updatePersonalLanguages.rejected.type,
          payload: error,
        })
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });
});
