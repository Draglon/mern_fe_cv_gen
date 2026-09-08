import { resume } from "@/mocks/resume";

import {
  isLoadingSelector,
  personalInfoSelector,
  personalInfoByLocaleSelector,
} from "../selectors";
import { RootState } from "../../store";

type PersonalInfoState = Pick<RootState, "personalInfo">;

describe("personalInfo selectors", () => {
  const data = resume.personalInfo;

  const state: PersonalInfoState = {
    personalInfo: {
      data,
      status: "loaded",
      error: null,
    },
  };

  describe("isLoadingSelector", () => {
    it("returns true when status is loading", () => {
      expect(
        isLoadingSelector({
          personalInfo: {
            ...state.personalInfo,
            status: "loading",
          },
        })
      ).toBe(true);
    });

    it("returns false when status is not loading", () => {
      expect(isLoadingSelector(state)).toBe(false);
    });
  });

  describe("personalInfoSelector", () => {
    it("returns personal info data", () => {
      expect(personalInfoSelector(state)).toEqual(data);
    });

    it("returns null when personal info data is null", () => {
      expect(
        personalInfoSelector({
          personalInfo: {
            ...state.personalInfo,
            data: null,
          },
        })
      ).toBeNull();
    });
  });

  describe("personalInfoByLocaleSelector", () => {
    it("returns personal info for en locale", () => {
      expect(personalInfoByLocaleSelector(state, "en")).toEqual({
        sectionTitle: "",
        userUrl: ["photoUrl"],
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        aboutMe: "Developer",
        address: "New York",
        phoneNumber: "+123456789",
        birthday: "01.01.1990",
        linkedIn: "",
        telegram: "",
        portfolio: "",
      });
    });

    it("returns personal info for ua locale", () => {
      expect(personalInfoByLocaleSelector(state, "ua")).toEqual({
        sectionTitle: "",
        userUrl: ["photoUrl"],
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        aboutMe: "Developer",
        address: "New York",
        phoneNumber: "+123456789",
        birthday: "01.01.1990",
        linkedIn: "",
        telegram: "",
        portfolio: "",
      });
    });

    it("returns personal info for ru locale", () => {
      expect(personalInfoByLocaleSelector(state, "ru")).toEqual({
        sectionTitle: "",
        userUrl: ["photoUrl"],
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        aboutMe: "Developer",
        address: "New York",
        phoneNumber: "+123456789",
        birthday: "01.01.1990",
        linkedIn: "",
        telegram: "",
        portfolio: "",
      });
    });
  });
});
