import { render, screen } from "@testing-library/react";

import UIKitHeader from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      UIKit: {
        title: "Title",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

jest.mock("@/views/shared/ThemeSwitcher", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <div {...props} data-testid="themeSwitcher">
      {children}
    </div>
  ),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  __esModule: true,
  Title: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
}));

describe("UIKitHeader", () => {
  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<UIKitHeader {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByTestId("themeSwitcher")).toBeInTheDocument();
    });
  });
});
