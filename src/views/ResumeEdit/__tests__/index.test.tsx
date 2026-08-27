import { render, screen, fireEvent } from "@testing-library/react";
import { useTranslations } from "next-intl";

import ResumeEdit from "..";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  Title: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
}));

const mockOnChange = jest.fn();
jest.mock("@/views/shared/LocalTabs", () => ({
  __esModule: true,
  default: ({ onChange }: any) => {
    mockOnChange.mockImplementation(onChange);

    return (
      <div data-testid="local-tabs">
        <button
          type="button"
          onClick={() => onChange("en")}
          data-testid="tab-en"
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => onChange("ua")}
          data-testid="tab-ua"
        >
          UA
        </button>

        <button
          type="button"
          onClick={() => onChange("ru")}
          data-testid="tab-ru"
        >
          RU
        </button>
      </div>
    );
  },
}));

jest.mock("@/views/shared/antd/Tabs", () => ({
  __esModule: true,
  default: ({ activeKey, onChange, items }: any) => (
    <div data-testid="tabs">
      {items?.map(({ key, label }: any) =>
        activeKey === key ? (
          <span key={key} data-testid={`tab-${key}-active`}>
            {label}
          </span>
        ) : (
          <button
            key={key}
            type="button"
            onClick={() => onChange?.(key)}
            data-testid={`tab-${key}`}
          >
            {label}
          </button>
        )
      )}
    </div>
  ),
}));

describe("ResumeEdit", () => {
  const mockedUseTranslations = jest.mocked(useTranslations);

  const translations: Record<string, string> = {
    title: "Edit resume",
    "tabs.general": "General",
    "tabs.hobbies": "Hobbies",
    "tabs.languages": "Languages",
    "tabs.experience": "Experience",
    "tabs.education": "Education",
    "tabs.courses": "Courses",
    "tabs.skills": "Skills",
    "tabs.tools": "Tools",
  };

  const localeTabs: Record<string, string> = {
    en: "EN",
    ua: "UA",
    ru: "RU",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseTranslations.mockImplementation(
      (namespace?: string) =>
        ((key: string) =>
          namespace === "ResumeEdit"
            ? translations[key]
            : localeTabs[key]) as any
    );
  });

  const renderComponent = () => render(<ResumeEdit />);

  it("renders ResumeEdit component", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Edit resume" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("tab-en")).toHaveTextContent("EN");
    expect(screen.getByTestId("tab-ru")).toHaveTextContent("RU");
    expect(screen.getByTestId("tab-ua")).toHaveTextContent("UA");
    expect(screen.getByTestId("tab-general-active")).toHaveTextContent(
      "General"
    );
    expect(screen.getByTestId("tab-education")).toHaveTextContent("Education");
  });

  it("changes current tab when valid tab key is provided", () => {
    renderComponent();

    expect(screen.getByTestId("tab-general-active")).toHaveTextContent(
      "General"
    );

    fireEvent.click(screen.getByRole("button", { name: "Education" }));

    expect(screen.getByTestId("tab-education-active")).toHaveTextContent(
      "Education"
    );
  });

  it("calls onChangeLocale when locale is changed", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "UA" }));
  });
});
