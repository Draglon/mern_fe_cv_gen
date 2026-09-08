import { resume } from "@/mocks/resume";
import { PersonalInfoProps } from "@/lib/constants/props/resume";
import {
  ParamsType,
  FieldType,
} from "@/lib/constants/props/resume/personalInfo";

import createPersonalInfo from "../operations/createPersonalInfo";
import fetchPersonalInfo from "../operations/fetchPersonalInfo";
import updatePersonalInfo from "../operations/updatePersonalInfo";

import personalInfoReducer, { personalInfoSlice } from "../reducer";

describe("personalInfoSlice", () => {
  const data: PersonalInfoProps = resume.personalInfo;

  const values: FieldType = {
    sectionTitle: "",
    userUrl: ["https://example.com"],
    firstName: "",
    lastName: "",
    email: "",
    aboutMe: "",
    address: "",
    phoneNumber: "",
    birthday: "",
    linkedIn: "",
    telegram: "",
    portfolio: "",
  };

  const params: ParamsType = {
    values,
    locale: "en",
    resumeLocale: "en",
  };

  const initialState = {
    data: null,
    status: undefined,
    error: null,
  };

  const state = {
    data,
    status: "loaded",
    error: null,
  };

  it("resets personal info", () => {
    expect(
      personalInfoReducer(state, personalInfoSlice.actions.resetPersonalInfo())
    ).toEqual(initialState);
  });

  describe("createPersonalInfo", () => {
    it("handles pending", () => {
      expect(
        personalInfoReducer(
          state,
          createPersonalInfo.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("handles fulfilled", () => {
      expect(
        personalInfoReducer(
          initialState,
          createPersonalInfo.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("handles rejected", () => {
      const error = new Error("Failed to create personal info");

      expect(
        personalInfoReducer(state, {
          type: createPersonalInfo.rejected.type,
          payload: error,
        })
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });

  describe("fetchPersonalInfo", () => {
    it("handles pending", () => {
      expect(
        personalInfoReducer(state, fetchPersonalInfo.pending("request-id"))
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("handles fulfilled", () => {
      expect(
        personalInfoReducer(
          initialState,
          fetchPersonalInfo.fulfilled(data, "request-id")
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("handles rejected", () => {
      const error = new Error("Failed to fetch personal info");

      expect(
        personalInfoReducer(state, {
          type: fetchPersonalInfo.rejected.type,
          payload: error,
        })
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });

  describe("updatePersonalInfo", () => {
    it("handles pending", () => {
      expect(
        personalInfoReducer(
          state,
          updatePersonalInfo.pending("request-id", params)
        )
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("handles fulfilled", () => {
      expect(
        personalInfoReducer(
          initialState,
          updatePersonalInfo.fulfilled(data, "request-id", params)
        )
      ).toEqual({
        data,
        status: "loaded",
        error: null,
      });
    });

    it("handles rejected", () => {
      const error = new Error("Failed to update personal info");

      expect(
        personalInfoReducer(state, {
          type: updatePersonalInfo.rejected.type,
          payload: error,
        })
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });
});
