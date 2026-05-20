import { ListenerMiddlewareInstance, AsyncThunk } from "@reduxjs/toolkit";

import { getNotificationMessages } from "@/i18n/notifications/getNotificationMessages";
import { createAsyncNotificationHandler } from "@/store/middleware/notifications/createAsyncNotificationHandler";

import loginOperation from "@/store/auth/operations/fetchAuth";
import registerOperation from "@/store/auth/operations/fetchRegister";
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

type AnyThunk = AsyncThunk<any, any, any>;

export const registerNotifications = (
  listenerMiddleware: ListenerMiddlewareInstance
) => {
  const map: ReadonlyArray<{
    thunk: AnyThunk;
    domain: string;
    action: string;
  }> = [
    { thunk: loginOperation, domain: "login", action: "auth" },
    { thunk: registerOperation, domain: "register", action: "create" },
    { thunk: createPersonalInfoOperation, domain: "personalInfo", action: "create" },
    { thunk: updatePersonalInfoOperation, domain: "personalInfo", action: "update" },
    { thunk: createPersonalHobbiesOperation, domain: "personalHobbies", action: "create" },
    { thunk: updatePersonalHobbiesOperation, domain: "personalHobbies", action: "update" },
    { thunk: createPersonalLanguagesOperation, domain: "personalLanguages", action: "create" },
    { thunk: updatePersonalLanguagesOperation, domain: "personalLanguages", action: "update" },
    { thunk: createPersonalExperiencesOperation, domain: "personalExperiences", action: "create" },
    { thunk: updatePersonalExperiencesOperation, domain: "personalExperiences", action: "update" },
    { thunk: createPersonalEducationOperation, domain: "personalEducation", action: "create" },
    { thunk: updatePersonalEducationOperation, domain: "personalEducation", action: "update" },
    { thunk: createPersonalCoursesOperation, domain: "personalCourses", action: "create" },
    { thunk: updatePersonalCoursesOperation, domain: "personalCourses", action: "update" },
    { thunk: createPersonalSkillsOperation, domain: "personalSkills", action: "create" },
    { thunk: updatePersonalSkillsOperation, domain: "personalSkills", action: "update" },
    { thunk: createPersonalToolsOperation, domain: "personalTools", action: "create" },
    { thunk: updatePersonalToolsOperation, domain: "personalTools", action: "update" },
  ] as const;

  map.forEach(({ thunk, domain, action }) => {
    createAsyncNotificationHandler(
      listenerMiddleware,
      thunk,
      async (actionArg) => {
        const locale = actionArg.meta.arg.locale;

        const messages = await getNotificationMessages(
          locale,
          domain,
          action
        );

        return messages;
      }
    );
  });
};
