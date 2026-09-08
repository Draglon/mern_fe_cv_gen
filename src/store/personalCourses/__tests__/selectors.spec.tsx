import {
  isLoadingSelector,
  personalCoursesSelector,
  personalCoursesByLocaleSelector,
} from "../selectors";

import { COURSES_DEFAULT_VALUES } from "@/lib/constants/forms/resumeEdit/courses";

describe("personalCourses selectors", () => {
  const data = {
    sectionTitle: {
      en: "Courses",
      ua: "Курси",
      ru: "Курсы",
    },
    courses: {
      en: [
        {
          course: "React Course",
          description: "React description",
          startDate: "2025-01-01",
          endDate: "2025-02-01",
          isCurrent: false,
        },
      ],
      ua: [],
      ru: [],
    },
  };

  const state = {
    personalCourses: {
      data,
      status: "loaded",
      error: null,
    },
  };

  describe("isLoadingSelector", () => {
    it("should return true when status is loading", () => {
      expect(
        isLoadingSelector({
          personalCourses: {
            ...state.personalCourses,
            status: "loading",
          },
        })
      ).toBe(true);
    });

    it("should return false when status is not loading", () => {
      expect(isLoadingSelector(state)).toBe(false);
    });
  });

  describe("personalCoursesSelector", () => {
    it("should return personal courses data", () => {
      expect(personalCoursesSelector(state)).toEqual(data);
    });
  });

  describe("personalCoursesByLocaleSelector", () => {
    it("should return section title and courses for the selected locale", () => {
      expect(personalCoursesByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "Courses",
        courses: data.courses.en,
      });
    });

    it("should return default courses when courses for the selected locale are empty", () => {
      expect(personalCoursesByLocaleSelector(state, "ua")).toEqual({
        sectionTitle: "Курси",
        courses: COURSES_DEFAULT_VALUES,
      });
    });

    it("should return default values when personal courses data is null", () => {
      const stateWithoutData = {
        personalCourses: {
          data: null,
          status: undefined,
          error: null,
        },
      };

      expect(personalCoursesByLocaleSelector(stateWithoutData, "en")).toEqual({
        sectionTitle: "",
        courses: COURSES_DEFAULT_VALUES,
      });
    });
  });
});
