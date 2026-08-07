import { render, screen } from "@testing-library/react";

import GuestHeader from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      shared: {
        logIn: "Log in",
        signUp: "Sign up",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

jest.mock("@/views/shared/NavigationLink", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({ children, dataTestId, dataCy, ...props }: any) => (
    <button data-testid={dataTestId} data-cy={dataCy} {...props}>
      {children}
    </button>
  ),
}));

describe("GuestHeader", () => {
  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<GuestHeader {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("btnLogIn")).toHaveTextContent("Log in");
      expect(screen.getByTestId("btnSignUp")).toHaveTextContent("Sign up");
    });
  });
});
