import {
  AsyncThunk,
  ListenerMiddlewareInstance,
} from "@reduxjs/toolkit";
import { notification } from "antd";

type MessagesFactory = {
  success: string;
  error: string;
};

export const createAsyncNotificationHandler = <
  Returned,
  ThunkArg extends { locale: string },
>(
  listenerMiddleware: ListenerMiddlewareInstance,
  thunk: AsyncThunk<Returned, ThunkArg, any>,
  getMessages: (
    action: ReturnType<typeof thunk.fulfilled>
  ) => Promise<MessagesFactory>
) => {
  listenerMiddleware.startListening({
    actionCreator: thunk.fulfilled,
    effect: async (action) => {
      const messages = await getMessages(action);

      notification.success({
        message: "Success",
        description: messages.success,
      });
    },
  });

  listenerMiddleware.startListening({
    actionCreator: thunk.rejected,
    effect: async (action) => {
      const messages = await getMessages(action as any);

      notification.error({
        message: "Error",
        description: messages.error,
      });
    },
  });
};
