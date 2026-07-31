import { render, screen } from "@testing-library/react";

import PersonalEducation, { EducationsProps } from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Template: {
        "personalEducation.currentTime.en": "Present",
        "faculty.en": "Faculty",
        "specialty.en": "Specialty",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

describe("PersonalEducation", () => {
  describe("renders component", () => {
    const defaultProps: EducationsProps = {
      templateLocale: "en",
      personalEducation: {
        education: {
          en: [
            {
              institute: "Institute",
              degree: "Degree",
              faculty: "Faculty description",
              specialization: "Specialization",
              startDate: "2020-01-25",
              endDate: "2021-02-25",
              isCurrent: false,
            },
          ],
          ua: [],
          ru: [],
        },
      },
    };

    const renderComponent = (props = defaultProps) =>
      render(<PersonalEducation {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByText("Degree")).toBeInTheDocument();
      expect(screen.getByText("2020 - 2021")).toBeInTheDocument();
      expect(screen.getByText("Institute")).toBeInTheDocument();
      expect(screen.getByText("Faculty")).toBeInTheDocument();
      expect(screen.getByText("Faculty description")).toBeInTheDocument();
      expect(screen.getByText("Specialty")).toBeInTheDocument();
      expect(screen.getByText("Specialization")).toBeInTheDocument();
    });

    it("when isCurrent is true", () => {
      const props: EducationsProps = {
        ...defaultProps,
        personalEducation: {
          ...defaultProps.personalEducation,
          education: {
            ...defaultProps.personalEducation.education,
            en: [
              {
                ...defaultProps.personalEducation.education.en[0],
                isCurrent: true,
              },
            ],
          },
        },
      };
      renderComponent(props);

      expect(screen.getByText("Degree")).toBeInTheDocument();
      expect(screen.getByText("2020 - present")).toBeInTheDocument();
      expect(screen.getByText("Institute")).toBeInTheDocument();
      expect(screen.getByText("Faculty")).toBeInTheDocument();
      expect(screen.getByText("Faculty description")).toBeInTheDocument();
      expect(screen.getByText("Specialty")).toBeInTheDocument();
      expect(screen.getByText("Specialization")).toBeInTheDocument();
    });
  });
});
