import { PersonalToolsProps } from "@/lib/constants/props/resume";

import { toolsByLocale } from "../personalTools";

describe("toolsByLocale", () => {
  const personalTools: PersonalToolsProps = {
    tools: {
      en: [
        { tool: "React", level: 90, visible: true },
        { tool: "TypeScript", level: 80, visible: true },
      ],
      ru: [],
      ua: [],
    },
  };

  it("returns tools for the specified locale", () => {
    expect(toolsByLocale("en", personalTools)).toEqual(personalTools.tools.en);
  });

  it("returns an empty array when locale tools are empty", () => {
    expect(toolsByLocale("ua", personalTools)).toEqual([]);
  });

  it("returns an empty array when tools is undefined", () => {
    expect(toolsByLocale("ua", undefined)).toEqual([]);
  });
});
