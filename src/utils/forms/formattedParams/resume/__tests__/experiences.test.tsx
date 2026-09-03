import { formattedParams } from "../experiences";

import {
  ParamsType,
  ExperienceType,
} from "@/lib/constants/props/resume/personalExperiences";

describe("formattedParams", () => {
  const experience: ExperienceType = {
    position: "Frontend Developer",
    companyName: "Company",
    location: "Remote",
    employmentType: "fullTime",
    workFormat: "remote",
    startDate: "2020-01-01",
    endDate: "2024-01-01",
    isCurrent: false,
    description: "Frontend development",
    skills: ["React", "TypeScript"],
  };

  it("formats employment type and work format", () => {
    const params: ParamsType = {
      locale: "en",
      resumeLocale: "en",
      values: {
        sectionTitle: "Experience",
        recentPositionsCount: 2,
        experiences: [experience],
      },
    };

    expect(formattedParams(params)).toEqual({
      ...params,
      ...params.values,
      experiences: [
        {
          ...experience,
          employmentType: "full-time",
          workFormat: "remote",
        },
      ],
    });
  });

  it("returns empty experiences when there are no experiences", () => {
    const params: ParamsType = {
      locale: "en",
      resumeLocale: "en",
      values: {
        experiences: [],
      },
    };

    expect(formattedParams(params)).toEqual({
      ...params,
      ...params.values,
      experiences: [],
    });
  });
});
