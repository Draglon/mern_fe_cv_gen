import { PersonalEducationProps } from "@/lib/constants/props/resume";

import { educationByLocale } from "../personalEducation";

describe("educationByLocale", () => {
  const personalEducation: PersonalEducationProps = {
    education: {
      en: [
        {
          institute: "Harvard University",
          degree: "Bachelor",
          faculty: "Computer Science",
          specialization: "Software Engineering",
          startDate: "2018",
          endDate: "2022",
          isCurrent: false,
        },
      ],
      ru: [],
      ua: [],
    },
  };

  it("returns education for the specified locale", () => {
    expect(educationByLocale("en", personalEducation)).toEqual(
      personalEducation.education.en
    );
  });

  it("returns an empty array when education for the specified locale is empty", () => {
    expect(educationByLocale("ua", personalEducation)).toEqual([]);
  });

  it("returns an empty array when personalEducation is undefined", () => {
    expect(educationByLocale("en", undefined)).toEqual([]);
  });
});
