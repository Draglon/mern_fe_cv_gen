import { PersonalSkillsProps } from "@/lib/constants/props/resume";
import {
  ParamsType,
  FieldType,
} from "@/lib/constants/props/resume/personalSkills";

import createPersonalSkills from "../operations/createPersonalSkills";
import fetchPersonalSkills from "../operations/fetchPersonalSkills";
import updatePersonalSkills from "../operations/updatePersonalSkills";

import personalSkillsReducer, { personalSkillsSlice } from "../reducer";

describe("personalSkillsSlice", () => {
  const data: PersonalSkillsProps = {
    sectionTitle: {
      en: "Skills",
      ua: "Навички",
      ru: "Навыки",
    },
    skills: {
      en: [
        {
          skill: "JavaScript",
          level: 5,
          visible: true,
        },
      ],
      ua: [
        {
          skill: "JavaScript",
          level: 5,
          visible: true,
        },
      ],
      ru: [],
    },
  };

  const values: FieldType = {
    sectionTitle: "",
    skills: [
      {
        skill: "JavaScript",
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

  describe("resetPersonalSkills", () => {
    it("should reset state", () => {
      expect(
        personalSkillsReducer(
          state,
          personalSkillsSlice.actions.resetPersonalSkills()
        )
      ).toEqual({
        data: null,
        status: undefined,
        error: null,
      });
    });
  });

  describe("createPersonalSkills", () => {
    it("should set loading state on pending", () => {
      expect(
        personalSkillsReducer(
          state,
          createPersonalSkills.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set loaded state with data on fulfilled", () => {
      expect(
        personalSkillsReducer(
          state,
          createPersonalSkills.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should set error state on rejected", () => {
      const error = "Create skills error";

      expect(
        personalSkillsReducer(state, {
          type: createPersonalSkills.rejected.type,
          payload: error,
        })
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });

  describe("fetchPersonalSkills", () => {
    it("should set loading state on pending", () => {
      expect(
        personalSkillsReducer(state, fetchPersonalSkills.pending("request-id"))
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set loaded state with data on fulfilled", () => {
      expect(
        personalSkillsReducer(
          state,
          fetchPersonalSkills.fulfilled(data, "request-id")
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should set error state on rejected", () => {
      const error = "Fetch skills error";

      expect(
        personalSkillsReducer(state, {
          type: fetchPersonalSkills.rejected.type,
          payload: error,
        })
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });

  describe("updatePersonalSkills", () => {
    it("should set loading state on pending", () => {
      expect(
        personalSkillsReducer(
          state,
          updatePersonalSkills.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set loaded state with data on fulfilled", () => {
      expect(
        personalSkillsReducer(
          state,
          updatePersonalSkills.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should set error state on rejected", () => {
      const error = "Update skills error";

      expect(
        personalSkillsReducer(state, {
          type: updatePersonalSkills.rejected.type,
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
