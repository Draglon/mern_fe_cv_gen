import { PersonalLanguagesProps } from "@/lib/constants/props/resume";

import { languagesByLocale } from "../personalLanguages";

describe("languagesByLocale", () => {
  const personalLanguages: PersonalLanguagesProps = {
    languages: {
      en: [
        { language: "English", level: "upperIntermediate" },
        { language: "Ukrainian", level: "native" },
      ],
      ru: [],
      ua: [],
    },
  };

  it("returns languages for the specified locale with formatted levels", () => {
    expect(languagesByLocale("en", personalLanguages)).toEqual([
      { language: "English", level: "upperIntermediate" },
      { language: "Ukrainian", level: "native" },
    ]);
  });

  it("returns an empty array when languages for the specified locale are empty", () => {
    expect(languagesByLocale("ua", personalLanguages)).toEqual([]);
  });

  it("returns an empty array when personal languages are undefined", () => {
    expect(languagesByLocale("ua", undefined)).toEqual([]);
  });
});
