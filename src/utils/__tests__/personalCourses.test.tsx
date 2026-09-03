import { PersonalCoursesProps } from "@/lib/constants/props/resume";

import { coursesByLocale } from "../personalCourses";

describe("coursesByLocale", () => {
  const personalCourses: PersonalCoursesProps = {
    courses: {
      en: [
        {
          course: "React Course",
          description: "Advanced React development",
          startDate: "2023-01",
          endDate: "2023-06",
          isCurrent: false,
        },
      ],
      ru: [],
      ua: [],
    },
  };

  it("returns courses for the specified locale", () => {
    expect(coursesByLocale("en", personalCourses)).toEqual(
      personalCourses.courses.en
    );
  });

  it("returns an empty array when courses for the specified locale are empty", () => {
    expect(coursesByLocale("ua", personalCourses)).toEqual([]);
  });

  it("returns an empty array when personalCourses is undefined", () => {
    expect(coursesByLocale("en", undefined)).toEqual([]);
  });
});
