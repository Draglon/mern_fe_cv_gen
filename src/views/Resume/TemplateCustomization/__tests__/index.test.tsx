import { render, screen, fireEvent } from "@testing-library/react";
import IntlMessageFormat from "intl-messageformat";

import ResumeTemplateCustomization from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      ResumeCustomization: {
        title: "Customizing resume",
        "locale.title": "Language",
        "locale.label":
          "{locale, select, ru {Russian} ua {Ukrainian} en {English} other {Unknown}}",
      },
    };

    return (key: string, values?: Record<string, unknown>) => {
      const message =
        translations[namespace as keyof typeof translations]?.[
          key as keyof (typeof translations)[keyof typeof translations]
        ];

      if (!message) {
        return key;
      }

      return new IntlMessageFormat(message, "en").format(values);
    };
  }),
}));

jest.mock("@/views/shared/antd/Typography", () => ({
  Title: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

describe("ResumeTemplateCustomization", () => {
  const defaultProps = {
    activeTemplateLocale: "en",
    setTemplateLocale: jest.fn(),
  };

  const renderComponent = (prop = defaultProps) =>
    render(<ResumeTemplateCustomization {...prop} />);

  it("renders component", () => {
    renderComponent();

    expect(screen.getByText("Customizing resume")).toBeInTheDocument();
    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Ukrainian")).toBeInTheDocument();
    expect(screen.getByText("Russian")).toBeInTheDocument();
  });

  it("calls setTemplateLocale with selected locale", () => {
    const setTemplateLocale = jest.fn();

    renderComponent({
      activeTemplateLocale: "en",
      setTemplateLocale,
    });

    fireEvent.click(screen.getByRole("button", { name: /Russian/i }));

    expect(setTemplateLocale).toHaveBeenCalledWith("ru");

    fireEvent.click(screen.getByRole("button", { name: /Ukrainian/i }));

    expect(setTemplateLocale).toHaveBeenCalledWith("ua");

    fireEvent.click(screen.getByRole("button", { name: /English/i }));

    expect(setTemplateLocale).toHaveBeenCalledWith("en");
  });
});
