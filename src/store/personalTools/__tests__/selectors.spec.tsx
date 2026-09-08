import { PersonalToolsProps } from "@/lib/constants/props/resume";

import {
  isLoadingSelector,
  personalToolsSelector,
  personalToolsByLocaleSelector,
} from "../selectors";

import { TOOLS_DEFAULT_VALUES } from "@/lib/constants/forms/resumeEdit/tools";

describe("personalTools selectors", () => {
  const data: PersonalToolsProps = {
    sectionTitle: {
      en: "Tools",
      ua: "Інструменти",
      ru: "Инструменты",
    },
    tools: {
      en: [
        {
          tool: "Git",
          level: 5,
          visible: true,
        },
        {
          tool: "Docker",
          level: 4,
          visible: true,
        },
      ],
      ua: [
        {
          tool: "Git",
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
        personalTools: {
          data,
          status: "loading",
          error: null,
        },
      };

      expect(isLoadingSelector(state)).toBe(true);
    });

    it("should return false when status is not loading", () => {
      const state = {
        personalTools: {
          data,
          status: "loaded",
          error: null,
        },
      };

      expect(isLoadingSelector(state)).toBe(false);
    });
  });

  describe("personalToolsSelector", () => {
    it("should return personal tools data", () => {
      const state = {
        personalTools: {
          data,
          status: "loaded",
          error: null,
        },
      };

      expect(personalToolsSelector(state)).toEqual(data);
    });
  });

  describe("personalToolsByLocaleSelector", () => {
    it("should return tools for selected locale", () => {
      const state = {
        personalTools: {
          data,
          status: "loaded",
          error: null,
        },
      };

      expect(personalToolsByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "Tools",
        tools: [
          {
            tool: "Git",
            level: 5,
            visible: true,
          },
          {
            tool: "Docker",
            level: 4,
            visible: true,
          },
        ],
      });
    });

    it("should return default values when tools are empty", () => {
      const state = {
        personalTools: {
          data,
          status: "loaded",
          error: null,
        },
      };

      expect(personalToolsByLocaleSelector(state, "ru")).toEqual({
        sectionTitle: "Инструменты",
        tools: TOOLS_DEFAULT_VALUES,
      });
    });

    it("should return default values when data is null", () => {
      const state = {
        personalTools: {
          data: null,
          status: "loaded",
          error: null,
        },
      };

      expect(personalToolsByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "",
        tools: TOOLS_DEFAULT_VALUES,
      });
    });
  });
});
