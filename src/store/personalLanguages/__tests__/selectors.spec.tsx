import {
  isLoadingSelector,
  personalLanguagesSelector,
  personalLanguagesByLocaleSelector,
} from "@/store/personalLanguages/selectors";

import { LANGUAGES_DEFAULT_VALUES } from "@/lib/constants/forms/resumeEdit/languages";
import { PersonalLanguagesProps } from "@/lib/constants/props/resume";

describe("personalLanguages selectors", () => {
  const data: PersonalLanguagesProps = {
    sectionTitle: {
      en: "Languages",
      ua: "Мови",
      ru: "Языки",
    },
    languages: {
      en: [
        { language: "English", level: "upperIntermediate" },
        { language: "Ukrainian", level: "native" },
      ],
      ua: [{ language: "Англійська", level: "upperIntermediate" }],
      ru: [{ language: "Английский", level: "upperIntermediate" }],
    },
  };

  const state = {
    personalLanguages: {
      data,
      status: "loading",
      error: null,
    },
  };

  describe("isLoadingSelector", () => {
    it("should return true when status is loading", () => {
      expect(isLoadingSelector(state)).toBe(true);
    });

    it("should return false when status is not loading", () => {
      expect(
        isLoadingSelector({
          ...state,
          personalLanguages: {
            ...state.personalLanguages,
            status: "loaded",
          },
        })
      ).toBe(false);
    });
  });

  describe("personalLanguagesSelector", () => {
    it("should return personal languages data", () => {
      expect(personalLanguagesSelector(state)).toEqual(data);
    });
  });

  describe("personalLanguagesByLocaleSelector", () => {
    it("should return data for selected locale", () => {
      expect(personalLanguagesByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "Languages",
        languages: data.languages.en,
      });
    });

    it("should return default values when locale has no languages", () => {
      expect(
        personalLanguagesByLocaleSelector(
          {
            ...state,
            personalLanguages: {
              ...state.personalLanguages,
              data: {
                ...data,
                languages: {
                  ...data.languages,
                  en: [],
                },
              },
            },
          },
          "en"
        )
      ).toEqual({
        sectionTitle: "Languages",
        languages: LANGUAGES_DEFAULT_VALUES,
      });
    });
  });
});
