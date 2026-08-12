import { render, screen } from "@testing-library/react";
import { notification } from "antd";

import NotificationProvider, { useNotification } from "../notificationProvider";

jest.mock("antd", () => ({
  notification: {
    useNotification: jest.fn(),
  },
}));

const mockApi = {
  success: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  loading: jest.fn(),
  open: jest.fn(),
  destroy: jest.fn(),
};

const mockedUseNotification = notification.useNotification as jest.Mock;

describe("NotificationProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (notification.useNotification as jest.Mock).mockReturnValue([
      mockApi,
      <div
        key="notification-context-holder"
        data-testid="notification-context-holder"
      />,
    ]);
  });

  it("renders children and contextHolder", () => {
    render(
      <NotificationProvider>
        <div data-testid="child">Child</div>
      </NotificationProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();

    expect(
      screen.getByTestId("notification-context-holder")
    ).toBeInTheDocument();
  });

  it("calls notification.useNotification", () => {
    render(
      <NotificationProvider>
        <div>Child</div>
      </NotificationProvider>
    );

    expect(mockedUseNotification).toHaveBeenCalledTimes(1);
  });

  it("provides notification api through context", () => {
    const TestComponent = () => {
      const api = useNotification();

      return (
        <button type="button" onClick={() => api.success({ title: "Success" })}>
          Show notification
        </button>
      );
    };

    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    screen
      .getByRole("button", {
        name: "Show notification",
      })
      .click();

    expect(mockApi.success).toHaveBeenCalledWith({
      title: "Success",
    });
  });
});

describe("useNotification", () => {
  it("throws an error when used outside NotificationProvider", () => {
    const TestComponent = () => {
      useNotification();

      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "useNotification must be used within NotificationProvider"
    );
  });
});
