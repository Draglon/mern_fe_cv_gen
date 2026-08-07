import { render, screen } from "@testing-library/react";

import UserHeader from "../";

jest.mock("@/views/shared/Navigation", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <div {...props} data-testid="navigation">
      {children}
    </div>
  ),
}));

jest.mock("@/views/shared/ThemeSwitcher", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <div {...props} data-testid="themeSwitcher">
      {children}
    </div>
  ),
}));

jest.mock("@/views/shared/LocalSwitcherSelect", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <div {...props} data-testid="localSwitcherSelect">
      {children}
    </div>
  ),
}));

jest.mock("../UserDropdownMenu", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <div {...props} data-testid="userDropdownMenu">
      {children}
    </div>
  ),
}));

describe("UserHeader", () => {
  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<UserHeader {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("navigation")).toBeInTheDocument();
      expect(screen.getByTestId("themeSwitcher")).toBeInTheDocument();
      expect(screen.getByTestId("localSwitcherSelect")).toBeInTheDocument();
      expect(screen.getByTestId("userDropdownMenu")).toBeInTheDocument();
    });
  });
});
