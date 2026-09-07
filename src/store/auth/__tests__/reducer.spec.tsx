import reducer from "../reducer";

import fetchAuth from "../operations/fetchAuth";
import fetchRegister from "../operations/fetchRegister";
import fetchUser from "../operations/fetchUser";
import updateUserResume from "../operations/updateUserResume";
import updateUserProfile from "../operations/updateUserProfile";
import updateUserEmail from "../operations/updateUserEmail";
import deleteAccount from "../operations/deleteAccount";

describe("authSlice reducer", () => {
  const user = {
    _id: "user-123",
    email: "john@example.com",
    userName: "JohnDoe",
    resume: {
      id: "resume-123",
    },
  };

  const initialState = {
    data: null,
    status: undefined,
    error: null,
  };

  it("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("logout", () => {
    it("should reset auth state", () => {
      const state = {
        data: user,
        status: "loaded",
        error: "Some error",
      };

      const action = {
        type: "auth/logout",
      };

      expect(reducer(state, action)).toEqual(initialState);
    });
  });

  describe("fetchAuth", () => {
    it("should set loading status on pending", () => {
      const state = {
        data: null,
        status: undefined,
        error: "Previous error",
      };

      expect(
        reducer(state, fetchAuth.pending("request-id", {} as never))
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set user data on fulfilled", () => {
      const state = {
        data: null,
        status: "loading",
        error: null,
      };

      expect(
        reducer(state, fetchAuth.fulfilled(user, "request-id", {} as never))
      ).toEqual({
        data: user,
        status: "loaded",
        error: null,
      });
    });

    it("should set error status on rejected", () => {
      const error = "Authentication failed";

      const state = {
        data: null,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          fetchAuth.rejected(new Error(error), "request-id", {} as never, error)
        )
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });

  describe("fetchRegister", () => {
    it("should set loading status on pending", () => {
      const state = {
        data: null,
        status: undefined,
        error: "Previous error",
      };

      expect(
        reducer(state, fetchRegister.pending("request-id", {} as never))
      ).toEqual({
        data: null,
        status: "loading",
        error: null,
      });
    });

    it("should set user data on fulfilled", () => {
      const state = {
        data: null,
        status: "loading",
        error: null,
      };

      expect(
        reducer(state, fetchRegister.fulfilled(user, "request-id", {} as never))
      ).toEqual({
        data: user,
        status: "loaded",
        error: null,
      });
    });

    it("should set error status on rejected", () => {
      const error = "Registration failed";

      const state = {
        data: null,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          fetchRegister.rejected(
            new Error(error),
            "request-id",
            {} as never,
            error
          )
        )
      ).toEqual({
        data: null,
        status: "error",
        error,
      });
    });
  });

  describe("fetchUser", () => {
    it("should set loading status on pending", () => {
      const state = {
        data: user,
        status: "loaded",
        error: "Previous error",
      };

      expect(
        reducer(state, fetchUser.pending("request-id", undefined))
      ).toEqual({
        data: user,
        status: "loading",
        error: null,
      });
    });

    it("should set user data on fulfilled", () => {
      const updatedUser = {
        ...user,
        userName: "UpdatedUser",
      };

      const state = {
        data: null,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          fetchUser.fulfilled(updatedUser, "request-id", undefined)
        )
      ).toEqual({
        data: updatedUser,
        status: "loaded",
        error: null,
      });
    });

    it("should set error status on rejected", () => {
      const error = "Failed to fetch user";

      const state = {
        data: user,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          fetchUser.rejected(new Error(error), "request-id", undefined, error)
        )
      ).toEqual({
        data: user,
        status: "error",
        error,
      });
    });
  });

  describe("updateUserResume", () => {
    it("should set loading status on pending", () => {
      const state = {
        data: user,
        status: "loaded",
        error: "Previous error",
      };

      expect(
        reducer(state, updateUserResume.pending("request-id", {} as never))
      ).toEqual({
        data: user,
        status: "loading",
        error: null,
      });
    });

    it("should merge updated resume data on fulfilled", () => {
      const resume = {
        id: "resume-456",
        title: "Updated Resume",
      };

      const state = {
        data: user,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          updateUserResume.fulfilled(resume, "request-id", {} as never)
        )
      ).toEqual({
        data: {
          ...user,
          ...resume,
        },
        status: "loaded",
        error: null,
      });
    });

    it("should set error status on rejected", () => {
      const error = "Failed to update resume";

      const state = {
        data: user,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          updateUserResume.rejected(
            new Error(error),
            "request-id",
            {} as never,
            error
          )
        )
      ).toEqual({
        data: user,
        status: "error",
        error,
      });
    });
  });

  describe("updateUserProfile", () => {
    it("should set loading status on pending", () => {
      const state = {
        data: user,
        status: "loaded",
        error: "Previous error",
      };

      expect(
        reducer(state, updateUserProfile.pending("request-id", {} as never))
      ).toEqual({
        data: user,
        status: "loading",
        error: null,
      });
    });

    it("should merge updated profile data on fulfilled", () => {
      const profile = {
        firstName: "John",
        lastName: "Doe",
        userName: "NewUsername",
      };

      const state = {
        data: user,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          updateUserProfile.fulfilled(profile, "request-id", {} as never)
        )
      ).toEqual({
        data: {
          ...user,
          ...profile,
        },
        status: "loaded",
        error: null,
      });
    });

    it("should set error status on rejected", () => {
      const error = "Failed to update profile";

      const state = {
        data: user,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          updateUserProfile.rejected(
            new Error(error),
            "request-id",
            {} as never,
            error
          )
        )
      ).toEqual({
        data: user,
        status: "error",
        error,
      });
    });
  });

  describe("updateUserEmail", () => {
    it("should set loading status on pending", () => {
      const state = {
        data: user,
        status: "loaded",
        error: "Previous error",
      };

      expect(
        reducer(state, updateUserEmail.pending("request-id", {} as never))
      ).toEqual({
        data: user,
        status: "loading",
        error: null,
      });
    });

    it("should merge updated email on fulfilled", () => {
      const email = {
        email: "new@example.com",
      };

      const state = {
        data: user,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          updateUserEmail.fulfilled(email, "request-id", {} as never)
        )
      ).toEqual({
        data: {
          ...user,
          ...email,
        },
        status: "loaded",
        error: null,
      });
    });

    it("should set error status on rejected", () => {
      const error = "Failed to update email";

      const state = {
        data: user,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          updateUserEmail.rejected(
            new Error(error),
            "request-id",
            {} as never,
            error
          )
        )
      ).toEqual({
        data: user,
        status: "error",
        error,
      });
    });
  });

  describe("deleteAccount", () => {
    it("should set loading status on pending", () => {
      const state = {
        data: user,
        status: "loaded",
        error: "Previous error",
      };

      expect(
        reducer(state, deleteAccount.pending("request-id", {} as never))
      ).toEqual({
        data: user,
        status: "loading",
        error: null,
      });
    });

    it("should set loaded status on fulfilled", () => {
      const state = {
        data: user,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          deleteAccount.fulfilled(undefined, "request-id", {} as never)
        )
      ).toEqual({
        data: user,
        status: "loaded",
        error: null,
      });
    });

    it("should set error status on rejected", () => {
      const error = "Failed to delete account";

      const state = {
        data: user,
        status: "loading",
        error: null,
      };

      expect(
        reducer(
          state,
          deleteAccount.rejected(
            new Error(error),
            "request-id",
            {} as never,
            error
          )
        )
      ).toEqual({
        data: user,
        status: "error",
        error,
      });
    });
  });
});
