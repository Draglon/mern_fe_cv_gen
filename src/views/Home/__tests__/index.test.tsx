import { render, screen } from "@testing-library/react";

import Home from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Home: {
        title: "Title",
        subtitle: "Sub title",
        createResumeButton: "Create resume",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

jest.mock("@/views/layouts/GuestLayout", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({ children, dataTestId, ...props }: any) => (
    <button {...props} data-testid={dataTestId}>
      {children}
    </button>
  ),
}));

jest.mock("@/views/shared/NavigationLink", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  __esModule: true,
  Title: ({ children }: any) => <span>{children}</span>,
}));

describe("Home", () => {
  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<Home {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Sub title")).toBeInTheDocument();
      expect(screen.getByTestId("btnCreateResume")).toHaveTextContent(
        "Create resume"
      );
    });
  });
});
