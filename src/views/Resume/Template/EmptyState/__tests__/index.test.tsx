import { render, screen } from "@testing-library/react";

import { resumeCreateRoute } from "@/lib/routes";

import ResumeTemplateEmptyState from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Template: {
        "emptyState.alt": "Empty state alt image",
        "emptyState.title": "Empty state title",
        "emptyState.description": "Empty state description",
        "emptyState.button": "Create resume",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({ children, dataTestId, dataCy }: any) => (
    <button data-testid={dataTestId} data-cy={dataCy}>
      {children}
    </button>
  ),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  Title: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  Paragraph: ({ children, ...props }: any) => <p {...props}>{children}</p>,
}));

jest.mock("@/views/shared/NavigationLink", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

describe("ResumeTemplateEmptyState", () => {
  const renderComponent = () => render(<ResumeTemplateEmptyState />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component", () => {
    renderComponent();

    expect(screen.getByAltText("Empty state alt image")).toBeInTheDocument();
    expect(screen.getByText("Empty state title")).toBeInTheDocument();
    expect(screen.getByText("Empty state description")).toBeInTheDocument();
    expect(screen.getByText("Create resume")).toBeInTheDocument();
  });

  it("renders create resume link", () => {
    renderComponent();

    expect(screen.getByRole("link")).toHaveAttribute("href", resumeCreateRoute);
  });
});
