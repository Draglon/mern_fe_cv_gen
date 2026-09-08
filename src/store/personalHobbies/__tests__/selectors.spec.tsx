import { HOBBIES_DEFAULT_VALUES } from "@/lib/constants/forms/resumeEdit/hobbies";

import {
  isLoadingSelector,
  personalHobbiesSelector,
  personalHobbiesByLocaleSelector,
} from "../selectors";

describe("personalHobbies selectors", () => {
  const initialState = {
    personalHobbies: {
      data: null,
      status: undefined,
      error: null,
    },
  };

  const data = {
    sectionTitle: {
      en: "Hobbies",
      ua: "Хобі",
      ru: "Хобби",
    },
    hobbies: {
      en: [{ hobby: "Reading" }, { hobby: "Traveling" }],
      ua: [{ hobby: "Читання" }],
      ru: [],
    },
  };

  describe("isLoadingSelector", () => {
    it("should return true when status is loading", () => {
      const state = {
        personalHobbies: {
          ...initialState.personalHobbies,
          status: "loading",
        },
      };

      expect(isLoadingSelector(state)).toBe(true);
    });

    it("should return false when status is not loading", () => {
      const state = {
        personalHobbies: {
          ...initialState.personalHobbies,
          status: "loaded",
        },
      };

      expect(isLoadingSelector(state)).toBe(false);
    });
  });

  describe("personalHobbiesSelector", () => {
    it("should return personal hobbies data", () => {
      const state = {
        personalHobbies: {
          ...initialState.personalHobbies,
          data,
          status: "loaded",
        },
      };

      expect(personalHobbiesSelector(state)).toEqual(data);
    });
  });

  describe("personalHobbiesByLocaleSelector", () => {
    it("should return hobbies for selected locale", () => {
      const state = {
        personalHobbies: {
          ...initialState.personalHobbies,
          data,
        },
      };

      expect(personalHobbiesByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "Hobbies",
        hobbies: [{ hobby: "Reading" }, { hobby: "Traveling" }],
      });
    });

    it("should return default hobbies when selected locale has no hobbies", () => {
      const state = {
        personalHobbies: {
          ...initialState.personalHobbies,
          data,
        },
      };

      expect(personalHobbiesByLocaleSelector(state, "ru")).toEqual({
        sectionTitle: "Хобби",
        hobbies: HOBBIES_DEFAULT_VALUES,
      });
    });

    it("should return default values when data is null", () => {
      expect(personalHobbiesByLocaleSelector(initialState, "en")).toEqual({
        sectionTitle: "",
        hobbies: HOBBIES_DEFAULT_VALUES,
      });
    });

    it("should return default values when selected locale hobbies are empty", () => {
      const state = {
        personalHobbies: {
          ...initialState.personalHobbies,
          data: {
            ...data,
            hobbies: {
              ...data.hobbies,
              en: [],
            },
          },
        },
      };

      expect(personalHobbiesByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "Hobbies",
        hobbies: HOBBIES_DEFAULT_VALUES,
      });
    });
  });
});
