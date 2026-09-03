import { formattedParams } from "../languages";

import { ParamsType } from "@/lib/constants/props/resume/personalLanguages";

describe("formattedParams", () => {
  const language = {
    language: "English",
    level: "upperIntermediate" as const,
  };

  it("formats language level", () => {
    const params: ParamsType = {
      locale: "en",
      resumeLocale: "en",
      values: {
        sectionTitle: "Languages",
        languages: [language],
      },
    };

    expect(formattedParams(params)).toEqual({
      ...params,
      ...params.values,
      languages: [
        {
          ...language,
          level: "upper-intermediate",
        },
      ],
    });
  });

  it("returns empty languages when there are no languages", () => {
    const params: ParamsType = {
      locale: "en",
      resumeLocale: "en",
      values: {
        sectionTitle: "Languages",
        languages: [],
      },
    };

    expect(formattedParams(params)).toEqual({
      ...params,
      ...params.values,
      languages: [],
    });
  });
});
