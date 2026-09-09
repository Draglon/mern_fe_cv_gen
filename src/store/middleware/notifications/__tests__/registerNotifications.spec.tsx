import { createAsyncNotificationHandler } from "@/store/middleware/notifications/createAsyncNotificationHandler";
import { getNotificationMessages } from "@/i18n/notifications/getNotificationMessages";

import loginOperation from "@/store/auth/operations/fetchAuth";
import registerOperation from "@/store/auth/operations/fetchRegister";
import updateUserProfileOperation from "@/store/auth/operations/updateUserProfile";
import updateUserEmailOperation from "@/store/auth/operations/updateUserEmail";
import updateUserPasswordOperation from "@/store/auth/operations/updateUserPassword";
import deleteAccountOperation from "@/store/auth/operations/deleteAccount";
import createPersonalInfoOperation from "@/store/personalInfo/operations/createPersonalInfo";
import updatePersonalInfoOperation from "@/store/personalInfo/operations/updatePersonalInfo";
import createPersonalHobbiesOperation from "@/store/personalHobbies/operations/createPersonalHobbies";
import updatePersonalHobbiesOperation from "@/store/personalHobbies/operations/updatePersonalHobbies";
import createPersonalLanguagesOperation from "@/store/personalLanguages/operations/createPersonalLanguages";
import updatePersonalLanguagesOperation from "@/store/personalLanguages/operations/updatePersonalLanguages";
import createPersonalExperiencesOperation from "@/store/personalExperience/operations/createPersonalExperience";
import updatePersonalExperiencesOperation from "@/store/personalExperience/operations/updatePersonalExperience";
import createPersonalEducationOperation from "@/store/personalEducation/operations/createPersonalEducation";
import updatePersonalEducationOperation from "@/store/personalEducation/operations/updatePersonalEducation";
import createPersonalCoursesOperation from "@/store/personalCourses/operations/createPersonalCourses";
import updatePersonalCoursesOperation from "@/store/personalCourses/operations/updatePersonalCourses";
import createPersonalSkillsOperation from "@/store/personalSkills/operations/createPersonalSkills";
import updatePersonalSkillsOperation from "@/store/personalSkills/operations/updatePersonalSkills";
import createPersonalToolsOperation from "@/store/personalTools/operations/createPersonalTools";
import updatePersonalToolsOperation from "@/store/personalTools/operations/updatePersonalTools";

import { registerNotifications } from "../registerNotifications";

jest.mock("@/store/middleware/notifications/createAsyncNotificationHandler");
jest.mock("@/i18n/notifications/getNotificationMessages");

describe("registerNotifications", () => {
  const listenerMiddleware = {
    startListening: jest.fn(),
  };

  const mockedCreateAsyncNotificationHandler = jest.mocked(
    createAsyncNotificationHandler
  );

  const mockedGetNotificationMessages = jest.mocked(getNotificationMessages);

  const operations = [
    {
      thunk: loginOperation,
      domain: "login",
      action: "auth",
    },
    {
      thunk: registerOperation,
      domain: "register",
      action: "create",
    },
    {
      thunk: updateUserProfileOperation,
      domain: "profile",
      action: "update",
    },
    {
      thunk: updateUserEmailOperation,
      domain: "settings",
      action: "changeEmail",
    },
    {
      thunk: updateUserPasswordOperation,
      domain: "settings",
      action: "changePassword",
    },
    {
      thunk: deleteAccountOperation,
      domain: "settings",
      action: "deleteAccount",
    },
    {
      thunk: createPersonalInfoOperation,
      domain: "personalInfo",
      action: "create",
    },
    {
      thunk: updatePersonalInfoOperation,
      domain: "personalInfo",
      action: "update",
    },
    {
      thunk: createPersonalHobbiesOperation,
      domain: "personalHobbies",
      action: "create",
    },
    {
      thunk: updatePersonalHobbiesOperation,
      domain: "personalHobbies",
      action: "update",
    },
    {
      thunk: createPersonalLanguagesOperation,
      domain: "personalLanguages",
      action: "create",
    },
    {
      thunk: updatePersonalLanguagesOperation,
      domain: "personalLanguages",
      action: "update",
    },
    {
      thunk: createPersonalExperiencesOperation,
      domain: "personalExperiences",
      action: "create",
    },
    {
      thunk: updatePersonalExperiencesOperation,
      domain: "personalExperiences",
      action: "update",
    },
    {
      thunk: createPersonalEducationOperation,
      domain: "personalEducation",
      action: "create",
    },
    {
      thunk: updatePersonalEducationOperation,
      domain: "personalEducation",
      action: "update",
    },
    {
      thunk: createPersonalCoursesOperation,
      domain: "personalCourses",
      action: "create",
    },
    {
      thunk: updatePersonalCoursesOperation,
      domain: "personalCourses",
      action: "update",
    },
    {
      thunk: createPersonalSkillsOperation,
      domain: "personalSkills",
      action: "create",
    },
    {
      thunk: updatePersonalSkillsOperation,
      domain: "personalSkills",
      action: "update",
    },
    {
      thunk: createPersonalToolsOperation,
      domain: "personalTools",
      action: "create",
    },
    {
      thunk: updatePersonalToolsOperation,
      domain: "personalTools",
      action: "update",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register notification handler for every operation", () => {
    registerNotifications(listenerMiddleware as any);

    expect(mockedCreateAsyncNotificationHandler).toHaveBeenCalledTimes(
      operations.length
    );

    operations.forEach(({ thunk }, index) => {
      expect(mockedCreateAsyncNotificationHandler).toHaveBeenNthCalledWith(
        index + 1,
        listenerMiddleware,
        thunk,
        expect.any(Function)
      );
    });
  });

  it("should get notification messages with locale, domain and action", async () => {
    const messages = {
      success: "Success",
      error: "Error",
    };

    mockedGetNotificationMessages.mockResolvedValue(messages);

    registerNotifications(listenerMiddleware as any);

    const [, , getMessages] =
      mockedCreateAsyncNotificationHandler.mock.calls[0];

    const action = {
      meta: {
        arg: {
          locale: "ua",
        },
      },
    };

    const result = await getMessages(action as any);

    expect(mockedGetNotificationMessages).toHaveBeenCalledWith(
      "ua",
      "login",
      "auth"
    );

    expect(result).toEqual(messages);
  });

  it("should use correct domain and action for every operation", async () => {
    mockedGetNotificationMessages.mockResolvedValue({
      success: "Success",
      error: "Error",
    });

    registerNotifications(listenerMiddleware as any);

    for (let index = 0; index < operations.length; index += 1) {
      const [, , getMessages] =
        mockedCreateAsyncNotificationHandler.mock.calls[index];

      const action = {
        meta: {
          arg: {
            locale: "en",
          },
        },
      };

      await getMessages(action as any);

      expect(mockedGetNotificationMessages).toHaveBeenLastCalledWith(
        "en",
        operations[index].domain,
        operations[index].action
      );
    }
  });
});
