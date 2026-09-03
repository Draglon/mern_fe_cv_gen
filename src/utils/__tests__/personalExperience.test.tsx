import { PersonalExperienceProps } from "@/lib/constants/props/resume";

import { experienceByLocale } from "../personalExperience";

describe("experienceByLocale", () => {
  const personalExperience: PersonalExperienceProps = {
    experiences: {
      en: [
        {
          position: "Frontend Developer",
          companyName: "Google",
          location: "New York",
          employmentType: "fullTime",
          workFormat: "remote",
          startDate: "2022-01",
          endDate: "2024-01",
          isCurrent: false,
          description: "Frontend development",
          skills: ["React", "TypeScript"],
        },
      ],
      ru: [],
      ua: [],
    },
  };

  it("returns experiences for the specified locale with formatted employment type and work format", () => {
    expect(experienceByLocale("en", personalExperience)).toEqual([
      {
        ...personalExperience.experiences.en[0],
        employmentType: "fullTime",
        workFormat: "remote",
      },
    ]);
  });

  it("returns an empty array when experiences for the specified locale are empty", () => {
    expect(experienceByLocale("ua", personalExperience)).toEqual([]);
  });

  it("returns an empty array when personalExperience is undefined", () => {
    expect(experienceByLocale("en", undefined)).toEqual([]);
  });
});
