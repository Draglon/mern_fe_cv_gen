import { ListenerMiddlewareInstance } from "@reduxjs/toolkit";

import { getNotificationMessages } from "@/i18n/notifications/getNotificationMessages";
import { createAsyncNotificationHandler } from "@/store/middleware/notifications/createAsyncNotificationHandler";

import createPersonalToolsOperation from "@/store/personalTools/operations/createPersonalTools";
import updatePersonalToolsOperation from "@/store/personalTools/operations/updatePersonalTools";

export const registerNotifications = (
  listenerMiddleware: ListenerMiddlewareInstance
) => {
  const map = [
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
