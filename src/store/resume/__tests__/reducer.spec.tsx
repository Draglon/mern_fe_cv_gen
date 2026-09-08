import { resume } from "@/mocks/resume";
import { ParamsType } from "@/lib/constants/props/resume";

import fetchResume from "../operations/fetchResume";
import resumeReducer from "../reducer";

describe("resumeSlice", () => {
  const params: ParamsType = {
    userId: "user-123",
  };

  const initialState = {
    data: null,
    status: undefined,
  };

  it("returns initial state", () => {
    expect(resumeReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("handles fetchResume.pending", () => {
    const state = {
      data: resume,
      status: "loaded",
    };

    expect(
      resumeReducer(state, fetchResume.pending("request-id", params))
    ).toEqual({
      data: null,
      status: "loading",
    });
  });

  it("handles fetchResume.fulfilled", () => {
    expect(
      resumeReducer(
        initialState,
        fetchResume.fulfilled(resume, "request-id", params)
      )
    ).toEqual({
      data: resume,
      status: "loaded",
    });
  });

  it("handles fetchResume.rejected", () => {
    const state = {
      data: resume,
      status: "loaded",
    };

    expect(
      resumeReducer(
        state,
        fetchResume.rejected(
          new Error("Failed to fetch resume"),
          "request-id",
          params
        )
      )
    ).toEqual({
      data: null,
      status: "error",
    });
  });
});
