import { render, screen } from "@testing-library/react";

import PersonalFullName, { PersonalFullNameProps } from "../";

describe("PersonalFullName", () => {
  describe("renders component", () => {
    const defaultProps: PersonalFullNameProps = {
      templateLocale: "en",
      personalInfo: {
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
      },
    };

    const renderComponent = (props = defaultProps) =>
      render(<PersonalFullName {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByText("First name Last name")).toBeInTheDocument();
    });
  });
});
