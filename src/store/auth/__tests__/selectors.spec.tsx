import { getProfileDefaultValues } from "@/utils/profile";
import { FieldType } from "@/lib/constants/props/profile";

import {
  isLoadingSelector,
  isAuthSelector,
  userSelector,
  userErrorSelector,
  userIdSelector,
  userEmailSelector,
  userNameSelector,
  userProfileSelector,
  userResumeSelector,
  personalInfoIdSelector,
  personalHobbiesIdSelector,
  personalLanguagesIdSelector,
  personalExperiencesIdSelector,
  personalEducationIdSelector,
  personalCoursesIdSelector,
  personalSkillsIdSelector,
  personalToolsIdSelector,
} from "../selectors";
import { RootState } from "../../store";

jest.mock("@/utils/profile");

const mockedGetProfileDefaultValues = jest.mocked(getProfileDefaultValues);

type AuthState = Pick<RootState, "auth">;

describe("auth selectors", () => {
  const user = {
    _id: "user-123",
    email: "john@example.com",
    userName: "JohnDoe",
    resume: {
      id: "resume-123",
    },
    personalInfoId: "info-123",
    personalHobbiesId: "hobbies-123",
    personalLanguagesId: "languages-123",
    personalExperiencesId: "experiences-123",
    personalEducationId: "education-123",
    personalCoursesId: "courses-123",
    personalSkillsId: "skills-123",
    personalToolsId: "tools-123",
  };

  const state: AuthState = {
    auth: {
      status: "success",
      data: user,
      error: null,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return true when auth status is loading", () => {
    const loadingState: AuthState = {
      ...state,
      auth: {
        ...state.auth,
        status: "loading",
      },
    };

    expect(isLoadingSelector(loadingState)).toBe(true);
  });

  it("should return false when auth status is not loading", () => {
    expect(isLoadingSelector(state)).toBe(false);
  });

  it("should return true when user is authenticated", () => {
    expect(isAuthSelector(state)).toBe(true);
  });

  it("should return false when user is not authenticated", () => {
    const unauthenticatedState: AuthState = {
      ...state,
      auth: {
        ...state.auth,
        data: null,
      },
    };

    expect(isAuthSelector(unauthenticatedState)).toBe(false);
  });

  it("should return user", () => {
    expect(userSelector(state)).toEqual(user);
  });

  it("should return user error", () => {
    const error = "Something went wrong";

    const errorState: AuthState = {
      ...state,
      auth: {
        ...state.auth,
        error,
      },
    };

    expect(userErrorSelector(errorState)).toBe(error);
  });

  it("should return user id", () => {
    expect(userIdSelector(state)).toBe(user._id);
  });

  it("should return user email", () => {
    expect(userEmailSelector(state)).toBe(user.email);
  });

  it("should return user name", () => {
    expect(userNameSelector(state)).toBe(user.userName);
  });

  it("should return user profile", () => {
    const profile: FieldType = {
      avatarUrl: [],
      firstName: "John",
      lastName: "Doe",
      userName: "JohnDoe",
    };

    mockedGetProfileDefaultValues.mockReturnValue(profile);

    expect(userProfileSelector(state)).toEqual(profile);
    expect(mockedGetProfileDefaultValues).toHaveBeenCalledWith(user);
  });

  it("should return user resume", () => {
    expect(userResumeSelector(state)).toEqual(user.resume);
  });

  it("should return personal info id", () => {
    expect(personalInfoIdSelector(state)).toBe(user.personalInfoId);
  });

  it("should return personal hobbies id", () => {
    expect(personalHobbiesIdSelector(state)).toBe(user.personalHobbiesId);
  });

  it("should return personal languages id", () => {
    expect(personalLanguagesIdSelector(state)).toBe(user.personalLanguagesId);
  });

  it("should return personal experiences id", () => {
    expect(personalExperiencesIdSelector(state)).toBe(
      user.personalExperiencesId
    );
  });

  it("should return personal education id", () => {
    expect(personalEducationIdSelector(state)).toBe(user.personalEducationId);
  });

  it("should return personal courses id", () => {
    expect(personalCoursesIdSelector(state)).toBe(user.personalCoursesId);
  });

  it("should return personal skills id", () => {
    expect(personalSkillsIdSelector(state)).toBe(user.personalSkillsId);
  });

  it("should return personal tools id", () => {
    expect(personalToolsIdSelector(state)).toBe(user.personalToolsId);
  });
});
