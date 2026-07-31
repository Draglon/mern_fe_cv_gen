import { render, screen } from "@testing-library/react";

import { PersonalInfoProps, TemplateProps } from "@/lib/constants/props/resume";
import { TEMPLATES } from "@/lib/constants/templates";

import PersonalInfo from "../";

describe("PersonalInfo", () => {
  describe("renders component", () => {
    const defaultProps: TemplateProps & { personalInfo: PersonalInfoProps } = {
      template: TEMPLATES.standford,
      templateLocale: "en",
      personalInfo: {
        sectionTitle: {
          en: "Section title",
          ua: "",
          ru: "",
        },
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
      render(<PersonalInfo {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-info-name")).toHaveTextContent(
        "First name Last name"
      );
      expect(screen.getByTestId("personal-info-about")).toHaveTextContent(
        "About Me"
      );
    });

    it("without section about me", () => {
      const props = {
        ...defaultProps,
        personalInfo: {
          ...defaultProps.personalInfo,
          aboutMe: {
            ...defaultProps.personalInfo.aboutMe,
            en: "",
          },
        },
      };
      renderComponent(props);

      expect(screen.getByTestId("personal-info-name")).toHaveTextContent(
        "First name Last name"
      );
      expect(
        screen.queryByTestId("personal-info-about")
      ).not.toBeInTheDocument();
    });
  });
});
