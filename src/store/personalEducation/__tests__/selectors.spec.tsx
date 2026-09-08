import { EDUCATION_DEFAULT_VALUES } from "@/lib/constants/forms/resumeEdit/education";
import { EducationType } from "@/lib/constants/props/resume/personalEducation";

import {
  isLoadingSelector,
  personalEducationSelector,
  personalEducationByLocaleSelector,
} from "../selectors";

describe("personalEducation selectors", () => {
  const education: EducationType[] = [
    {
      institute: "University",
      degree: "Bachelor",
      faculty: "Computer Science",
      specialization: "Software Engineering",
      startDate: "2020-09-01",
      endDate: "2024-06-30",
      isCurrent: false,
    },
  ];

  const data = {
    sectionTitle: {
      en: "Education",
      ua: "Освіта",
      ru: "Образование",
    },
    education: {
      en: education,
      ua: [],
      ru: [],
    },
  };

  describe("isLoadingSelector", () => {
    it("should return true when status is loading", () => {
      const state = {
        personalEducation: {
          data: null,
          status: "loading",
          error: null,
        },
      };

      expect(isLoadingSelector(state)).toBe(true);
    });

    it("should return false when status is not loading", () => {
      const state = {
        personalEducation: {
          data: null,
          status: "loaded",
          error: null,
        },
      };

      expect(isLoadingSelector(state)).toBe(false);
    });
  });

  describe("personalEducationSelector", () => {
    it("should return personal education data", () => {
      const state = {
        personalEducation: {
          data,
          status: "loaded",
          error: null,
        },
      };

      expect(personalEducationSelector(state)).toEqual(data);
    });
  });

  describe("personalEducationByLocaleSelector", () => {
    it("should return section title and education for selected locale", () => {
      const state = {
        personalEducation: {
          data,
          status: "loaded",
          error: null,
        },
      };

      expect(personalEducationByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "Education",
        education,
      });
    });

    it("should return default education when education is empty", () => {
      const state = {
        personalEducation: {
          data: {
            ...data,
            education: {
              ...data.education,
              ua: [],
            },
          },
          status: "loaded",
          error: null,
        },
      };

      expect(personalEducationByLocaleSelector(state, "ua")).toEqual({
        sectionTitle: "Освіта",
        education: EDUCATION_DEFAULT_VALUES,
      });
    });

    it("should return default values when personal education data is null", () => {
      const state = {
        personalEducation: {
          data: null,
          status: undefined,
          error: null,
        },
      };

      expect(personalEducationByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "",
        education: EDUCATION_DEFAULT_VALUES,
      });
    });
  });
});
