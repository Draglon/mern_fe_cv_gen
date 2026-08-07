import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { homeRoute } from "@/lib/routes";
import clearAuthSession from "@/utils/clearAuthSession";

import UserDropdownMenu from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      shared: {
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  ...jest.requireActual("@/store/hooks"),
  useAppDispatch: () => mockDispatch,
}));

const push = jest.fn();
jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

jest.mock("@/utils/clearAuthSession", () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve()),
}));

jest.mock("@/views/shared/DropdownMenu", () => ({
  __esModule: true,
  default: ({
    items,
  }: {
    items: Array<{ key?: React.Key; label?: React.ReactNode }>;
  }) => (
    <div data-testid="dropdownMenu">
      {items
        .filter((item) => item.label)
        .map((item) => (
          <div key={item.key}>{item.label}</div>
        ))}
    </div>
  ),
}));

jest.mock("@/views/shared/DropdownMenuIcon", () => ({
  __esModule: true,
  default: () => <div data-testid="dropdownMenuIcon" />,
}));

jest.mock("@/views/shared/DropdownMenuItem", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }) => (
    <div data-testid="dropdownMenuItem" onClick={onClick}>
      {children}
    </div>
  ),
}));

describe("UserDropdownMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<UserDropdownMenu {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("dropdownMenu")).toBeInTheDocument();
      expect(screen.getAllByTestId("dropdownMenuItem")).toHaveLength(3);
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("logs out and redirects", async () => {
      renderComponent();

      const logoutItem = screen.getByText("Logout");

      fireEvent.click(logoutItem);

      await waitFor(() => {
        expect(clearAuthSession).toHaveBeenCalledWith(mockDispatch);
        expect(push).toHaveBeenCalledWith(homeRoute);
        expect(push).toHaveBeenCalledTimes(1);
      });
    });

    it("does not logout if already loading", () => {
      const setLoading = jest.fn();

      jest.spyOn(React, "useState").mockReturnValueOnce([true, setLoading]);

      renderComponent();

      const logoutItem = screen.getByText("Logout");

      fireEvent.click(logoutItem);

      expect(clearAuthSession).not.toHaveBeenCalled();
      expect(push).not.toHaveBeenCalled();
    });
  });
});
