import { resume } from "@/mocks/resume";

import { RootState } from "../../store";
import { isLoadingSelector, resumeSelector } from "../selectors";

type ResumeState = Pick<RootState, "resume">;

describe("resume selectors", () => {
  const state: ResumeState = {
    resume: {
      data: resume,
      status: "loaded",
    },
  };

  describe("isLoadingSelector", () => {
    it("returns true when status is loading", () => {
      expect(
        isLoadingSelector({
          resume: {
            ...state.resume,
            status: "loading",
          },
        })
      ).toBe(true);
    });

    it("returns false when status is not loading", () => {
      expect(isLoadingSelector(state)).toBe(false);
    });
  });

  describe("resumeSelector", () => {
    it("returns resume data", () => {
      expect(resumeSelector(state)).toEqual(resume);
    });

    it("returns null when resume data is null", () => {
      expect(
        resumeSelector({
          resume: {
            ...state.resume,
            data: null,
          },
        })
      ).toBeNull();
    });
  });
});
