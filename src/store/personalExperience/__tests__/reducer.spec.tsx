import {
  ParamsType,
  FieldType,
} from "@/lib/constants/props/resume/personalExperiences";
import { PersonalExperienceProps } from "@/lib/constants/props/resume";

import createPersonalExperience from "../operations/createPersonalExperience";
import fetchPersonalExperience from "../operations/fetchPersonalExperience";
import updatePersonalExperience from "../operations/updatePersonalExperience";

import personalExperienceReducer, { personalExperienceSlice } from "../reducer";

describe("personalExperienceSlice", () => {
  const initialState = {
    data: null,
    status: undefined,
    error: null,
  };

  const values: FieldType = {
    sectionTitle: "",
    recentPositionsCount: 2,
    experiences: [
      {
        position: "Developer",
        companyName: "Company",
        location: "Ukraine",
        employmentType: "fullTime",
        workFormat: "remote",
        startDate: "2026-02-24",
        endDate: "2027-02-24",
        isCurrent: true,
        description: "Description",
        skills: ["React", "TypeScript"],
      },
    ],
  };

  const params: ParamsType = {
    values,
    locale: "en",
    resumeLocale: "en",
  };

  const data: PersonalExperienceProps = {
    sectionTitle: {
      en: "Experience",
      ua: "",
      ru: "",
    },
    recentPositionsCount: {
      en: 2,
      ua: 2,
      ru: 2,
    },
    experiences: {
      en: [
        {
          position: "Developer",
          companyName: "Company",
          location: "Ukraine",
          employmentType: "fullTime",
          workFormat: "remote",
          startDate: "2026-02-24",
          endDate: "2027-02-24",
          isCurrent: true,
          description: "Description",
          skills: ["React", "TypeScript"],
        },
      ],
      ua: [],
      ru: [],
    },
  };

  const rejectedError = new Error("Something went wrong");

  describe("resetPersonalExperience", () => {
    it("should reset state to initial values", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      const action = personalExperienceSlice.actions.resetPersonalExperience();

      expect(personalExperienceReducer(state, action)).toEqual(initialState);
    });
  });

  describe("createPersonalExperience", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalExperienceReducer(
          state,
          createPersonalExperience.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalExperienceReducer(
          initialState,
          createPersonalExperience.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: createPersonalExperience.rejected.type,
        payload: rejectedError,
      };

      expect(personalExperienceReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });

  describe("fetchPersonalExperience", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalExperienceReducer(
          state,
          fetchPersonalExperience.pending("request-id")
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalExperienceReducer(
          initialState,
          fetchPersonalExperience.fulfilled(data, "request-id")
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: fetchPersonalExperience.rejected.type,
        payload: rejectedError,
      };

      expect(personalExperienceReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });

  describe("updatePersonalExperience", () => {
    it("should handle pending", () => {
      const state = {
        data,
        status: "loaded",
        error: rejectedError,
      };

      expect(
        personalExperienceReducer(
          state,
          updatePersonalExperience.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should handle fulfilled", () => {
      expect(
        personalExperienceReducer(
          initialState,
          updatePersonalExperience.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("should handle rejected", () => {
      const action = {
        type: updatePersonalExperience.rejected.type,
        payload: rejectedError,
      };

      expect(personalExperienceReducer(initialState, action)).toEqual({
        data: null,
        status: "error",
        error: rejectedError,
      });
    });
  });
});
