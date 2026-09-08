import { SKILLS_DEFAULT_VALUES } from "@/lib/constants/forms/resumeEdit/skills";
import { PersonalSkillsProps } from "@/lib/constants/props/resume";

import {
  isLoadingSelector,
  personalSkillsSelector,
  personalSkillsByLocaleSelector,
} from "../selectors";

describe("personalSkills selectors", () => {
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
        {
          skill: "React",
          level: 4,
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

  describe("isLoadingSelector", () => {
    it("should return true when status is loading", () => {
      const state = {
        personalSkills: {
          data,
          status: "loading",
          error: null,
        },
      };

      expect(isLoadingSelector(state)).toBe(true);
    });

    it("should return false when status is not loading", () => {
      const state = {
        personalSkills: {
          data,
          status: "loaded",
          error: null,
        },
      };

      expect(isLoadingSelector(state)).toBe(false);
    });
  });

  describe("personalSkillsSelector", () => {
    it("should return personal skills data", () => {
      const state = {
        personalSkills: {
          data,
          status: "loaded",
          error: null,
        },
      };

      expect(personalSkillsSelector(state)).toEqual(data);
    });
  });

  describe("personalSkillsByLocaleSelector", () => {
    it("should return skills for selected locale", () => {
      const state = {
        personalSkills: {
          data,
          status: "loaded",
          error: null,
        },
      };

      expect(personalSkillsByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "Skills",
        skills: [
          {
            skill: "JavaScript",
            level: 5,
            visible: true,
          },
          {
            skill: "React",
            level: 4,
            visible: true,
          },
        ],
      });
    });

    it("should return default values when skills are empty", () => {
      const state = {
        personalSkills: {
          data,
          status: "loaded",
          error: null,
        },
      };

      expect(personalSkillsByLocaleSelector(state, "ru")).toEqual({
        sectionTitle: "Навыки",
        skills: SKILLS_DEFAULT_VALUES,
      });
    });
  });
});
