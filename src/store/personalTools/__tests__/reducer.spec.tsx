import { PersonalToolsProps } from "@/lib/constants/props/resume";
import {
  ParamsType,
  FieldType,
} from "@/lib/constants/props/resume/personalTools";

import createPersonalTools from "../operations/createPersonalTools";
import fetchPersonalTools from "../operations/fetchPersonalTools";
import updatePersonalTools from "../operations/updatePersonalTools";

import personalToolsReducer, { personalToolsSlice } from "../reducer";

describe("personalToolsSlice", () => {
  const data: PersonalToolsProps = {
    sectionTitle: {
      en: "Tools",
      ua: "Інструменти",
      ru: "Инструменты",
    },
    tools: {
      en: [
        {
          tool: "Git",
          level: 5,
          visible: true,
        },
      ],
      ua: [
        {
          tool: "Docker",
          level: 4,
          visible: true,
        },
      ],
      ru: [],
    },
  };

  const values: FieldType = {
    sectionTitle: "",
    tools: [
      {
        tool: "Git",
        level: 5,
        visible: true,
      },
    ],
  };

  const params: ParamsType = {
    values,
    locale: "en",
    resumeLocale: "en",
  };

  const state = {
    data,
    status: "loaded",
    error: null,
  };

  describe("resetPersonalTools", () => {
    it("should reset state", () => {
      expect(
        personalToolsReducer(
          state,
          personalToolsSlice.actions.resetPersonalTools()
        )
      ).toEqual({
        data: null,
        status: undefined,
        error: null,
      });
    });
  });

  describe("createPersonalTools", () => {
    it("should set loading state on pending", () => {
      expect(
        personalToolsReducer(
          state,
          createPersonalTools.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set loaded state with data on fulfilled", () => {
      expect(
        personalToolsReducer(
          state,
          createPersonalTools.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should set error state on rejected", () => {
      const error = "Create tools error";

      expect(
        personalToolsReducer(state, {
          type: createPersonalTools.rejected.type,
          payload: error,
        })
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });

  describe("fetchPersonalTools", () => {
    it("should set loading state on pending", () => {
      expect(
        personalToolsReducer(state, fetchPersonalTools.pending("request-id"))
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set loaded state with data on fulfilled", () => {
      expect(
        personalToolsReducer(
          state,
          fetchPersonalTools.fulfilled(data, "request-id")
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should set error state on rejected", () => {
      const error = "Fetch tools error";

      expect(
        personalToolsReducer(state, {
          type: fetchPersonalTools.rejected.type,
          payload: error,
        })
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });

  describe("updatePersonalTools", () => {
    it("should set loading state on pending", () => {
      expect(
        personalToolsReducer(
          state,
          updatePersonalTools.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set loaded state with data on fulfilled", () => {
      expect(
        personalToolsReducer(
          state,
          updatePersonalTools.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should set error state on rejected", () => {
      const error = "Update tools error";

      expect(
        personalToolsReducer(state, {
          type: updatePersonalTools.rejected.type,
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
