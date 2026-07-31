import { render, screen } from "@testing-library/react";

import PersonalLanguages, { LanguagesProps } from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Template: {
        "personalLanguages.level.native.en": "Native",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

describe("PersonalLanguages", () => {
  describe("renders component", () => {
    const defaultProps: LanguagesProps = {
      templateLocale: "en",
      personalLanguages: {
        languages: {
          en: [
            {
              language: "English",
              level: "native",
            },
          ],
          ua: [],
          ru: [],
        },
      },
    };

    const renderComponent = (props = defaultProps) =>
      render(<PersonalLanguages {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-language")).toHaveTextContent(
        "English"
      );
      expect(screen.getByTestId("personal-language-level")).toHaveTextContent(
        "Native"
      );
    });
  });
});
