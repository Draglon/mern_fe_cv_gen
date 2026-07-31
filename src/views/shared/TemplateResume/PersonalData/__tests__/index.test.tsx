import { render, screen } from "@testing-library/react";

import { PersonalInfoProps, TemplateProps } from "@/lib/constants/props/resume";
import { TEMPLATES } from "@/lib/constants/templates";

import PersonalData from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Template: {
        "personalData.name.en": "Name",
        "personalData.address.en": "Address",
        "personalData.phoneNumber.en": "Phone number",
        "personalData.email.en": "Email",
        "personalData.telegram.en": "Telegram",
        "personalData.birthday.en": "Birthday",
        "personalData.portfolio.en": "Portfolio",
        "personalData.linkedIn.en": "Linked in",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

describe("PersonalData", () => {
  describe("renders component", () => {
    const defaultProps: TemplateProps & { personalInfo: PersonalInfoProps } = {
      template: TEMPLATES.standford,
      templateLocale: "en",
      personalInfo: {
        userUrl: {
          en: "userUrl",
          ua: "",
          ru: "",
        },
        firstName: {
          en: "First name",
          ua: "",
          ru: "",
        },
        lastName: {
          en: "Last name",
          ua: "",
          ru: "",
        },
        email: {
          en: "example@gmail.com",
          ua: "",
          ru: "",
        },
        aboutMe: {
          en: "About Me",
          ua: "",
          ru: "",
        },
        address: {
          en: "address",
          ua: "",
          ru: "",
        },
        phoneNumber: {
          en: "+380981255050",
          ua: "",
          ru: "",
        },
        birthday: {
          en: "2004-02-25",
          ua: "",
          ru: "",
        },
        linkedIn: {
          en: "linkedIn.com",
          ua: "",
          ru: "",
        },
        telegram: {
          en: "@telegram",
          ua: "",
          ru: "",
        },
        portfolio: {
          en: "portfolio.com",
          ua: "",
          ru: "",
        },
      },
    };

    const renderComponent = (props = defaultProps) =>
      render(<PersonalData {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-name")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("First name Last name")).toBeInTheDocument();

      expect(screen.queryByTestId("personal-address")).toBeInTheDocument();
      expect(screen.getByText("Address")).toBeInTheDocument();
      expect(screen.getByText("address")).toBeInTheDocument();

      expect(screen.queryByTestId("personal-phone-number")).toBeInTheDocument();
      expect(screen.getByText("Phone number")).toBeInTheDocument();
      expect(screen.getByText("+380 98 125 5050")).toBeInTheDocument();

      expect(screen.queryByTestId("personal-email")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("example@gmail.com")).toBeInTheDocument();

      expect(screen.queryByTestId("personal-telegram")).toBeInTheDocument();
      expect(screen.getByText("Telegram")).toBeInTheDocument();
      expect(screen.getByText("@telegram")).toBeInTheDocument();

      expect(screen.queryByTestId("personal-birthday")).toBeInTheDocument();
      expect(screen.getByText("Birthday")).toBeInTheDocument();
      expect(screen.getByText("25 Feb 2004")).toBeInTheDocument();

      expect(screen.queryByTestId("personal-portfolio")).toBeInTheDocument();
      expect(screen.getByText("Portfolio")).toBeInTheDocument();
      expect(screen.getByText("portfolio.com")).toBeInTheDocument();

      expect(screen.queryByTestId("personal-linkedIn")).toBeInTheDocument();
      expect(screen.getByText("Linked in")).toBeInTheDocument();
      expect(screen.getByText("linkedIn.com")).toBeInTheDocument();
    });
  });
});
