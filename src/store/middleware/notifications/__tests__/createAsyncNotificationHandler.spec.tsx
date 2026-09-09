import { notification } from "antd";

import { createAsyncNotificationHandler } from "../createAsyncNotificationHandler";

jest.mock("antd", () => ({
  notification: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("createAsyncNotificationHandler", () => {
  const fulfilledAction = {
    type: "test/fulfilled",
    payload: {
      id: "123",
    },
  };

  const rejectedAction = {
    type: "test/rejected",
    payload: "error",
  };

  const successMessages = {
    success: "Personal info created successfully",
    error: "Failed to create personal info",
  };

  const getMessages = jest.fn();

  const fulfilledEffect = jest.fn();
  const rejectedEffect = jest.fn();

  const listenerMiddleware = {
    startListening: jest.fn((config) => {
      if (config.actionCreator === thunk.fulfilled) {
        fulfilledEffect.mockImplementation(config.effect);
      }

      if (config.actionCreator === thunk.rejected) {
        rejectedEffect.mockImplementation(config.effect);
      }
    }),
  };

  const thunk = {
    fulfilled: jest.fn(),
    rejected: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register fulfilled and rejected listeners", () => {
    createAsyncNotificationHandler(
      listenerMiddleware as any,
      thunk,
      getMessages
    );

    expect(listenerMiddleware.startListening).toHaveBeenCalledTimes(2);

    expect(listenerMiddleware.startListening).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        actionCreator: thunk.fulfilled,
        effect: expect.any(Function),
      })
    );

    expect(listenerMiddleware.startListening).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        actionCreator: thunk.rejected,
        effect: expect.any(Function),
      })
    );
  });

  it("should show success notification when thunk is fulfilled", async () => {
    getMessages.mockResolvedValue(successMessages);

    createAsyncNotificationHandler(
      listenerMiddleware as any,
      thunk,
      getMessages
    );

    await fulfilledEffect(fulfilledAction, {});

    expect(getMessages).toHaveBeenCalledWith(fulfilledAction);

    expect(notification.success).toHaveBeenCalledWith({
      title: "Success",
      description: successMessages.success,
    });
  });

  it("should show error notification when thunk is rejected", async () => {
    getMessages.mockResolvedValue(successMessages);

    createAsyncNotificationHandler(
      listenerMiddleware as any,
      thunk,
      getMessages
    );

    await rejectedEffect(rejectedAction, {});

    expect(getMessages).toHaveBeenCalledWith(rejectedAction);

    expect(notification.error).toHaveBeenCalledWith({
      title: "Error",
      description: successMessages.error,
    });
  });
});
