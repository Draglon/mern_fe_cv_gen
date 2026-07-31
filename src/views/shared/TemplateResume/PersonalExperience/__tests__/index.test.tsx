import { render, screen } from "@testing-library/react";

import PersonalExperience, { ExperiencesProps } from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Template: {
        "personalExperience.currentTime.en": "Present",
        "personalExperience.workFormat.office.en": "Office work",
        "personalExperience.employmentType.fullTime.en": "Full time",
        "personalExperience.techStack.en": "Stack",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

describe("PersonalExperience", () => {
  describe("renders component", () => {
    const defaultProps: ExperiencesProps = {
      templateLocale: "en",
      experiences: [
        {
          position: "Position",
          companyName: "Company name",
          location: "Location",
          employmentType: "fullTime",
          workFormat: "office",
          startDate: "2020-01-20",
          endDate: "2021-01-21",
          isCurrent: false,
          description: "Description",
          skills: ["Skill 1"],
        },
      ],
    };

    const renderComponent = (props = defaultProps) =>
      render(<PersonalExperience {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByText("Position")).toBeInTheDocument();
      expect(screen.getByText("jan 2020 - jan 2021")).toBeInTheDocument();
      expect(screen.getByText("Company name")).toBeInTheDocument();
      expect(screen.getByText("Location")).toBeInTheDocument();
      expect(screen.getByText("· Office work")).toBeInTheDocument();
      expect(screen.getByText("· Full time")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Stack:")).toBeInTheDocument();
      expect(screen.getByText("Skill 1")).toBeInTheDocument();
    });

    it("when isCurrent is true", () => {
      const props: ExperiencesProps = {
        ...defaultProps,
        experiences: [
          {
            ...defaultProps.experiences[0],
            isCurrent: true,
          },
        ],
      };
      renderComponent(props);

      expect(screen.getByText("Position")).toBeInTheDocument();
      expect(screen.getByText("jan 2020 - present")).toBeInTheDocument();
      expect(screen.getByText("Company name")).toBeInTheDocument();
      expect(screen.getByText("Location")).toBeInTheDocument();
      expect(screen.getByText("· Office work")).toBeInTheDocument();
      expect(screen.getByText("· Full time")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Stack:")).toBeInTheDocument();
      expect(screen.getByText("Skill 1")).toBeInTheDocument();
    });
  });
});
