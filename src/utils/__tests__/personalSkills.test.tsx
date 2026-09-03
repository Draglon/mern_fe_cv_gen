import { PersonalSkillsProps } from "@/lib/constants/props/resume";

import { skillsByLocale } from "../personalSkills";

describe("skillsByLocale", () => {
  const personalSkills: PersonalSkillsProps = {
    skills: {
      en: [
        { skill: "React", level: 90, visible: true },
        { skill: "TypeScript", level: 80, visible: true },
      ],
      ru: [],
      ua: [],
    },
  };

  it("returns skills for the specified locale", () => {
    expect(skillsByLocale("en", personalSkills)).toEqual(
      personalSkills.skills.en
    );
  });

  it("returns an empty array when locale skills are empty", () => {
    expect(skillsByLocale("ua", personalSkills)).toEqual([]);
  });

  it("returns an empty array when skills is undefined", () => {
    expect(skillsByLocale("ua", undefined)).toEqual([]);
  });
});
