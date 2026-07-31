import { render, screen } from "@testing-library/react";

import PersonalCourses, { CoursesProps } from "../";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((namespace: string) => {
    const translations = {
      Template: {
        "personalCourses.currentTime.en": "Present",
        "personalCourses.currentTime.ua": "До теперішнього часу",
        "personalCourses.currentTime.ru": "По настоящее время",
      },
    };

    return (key: string) =>
      translations[namespace as keyof typeof translations]?.[
        key as keyof (typeof translations)[keyof typeof translations]
      ] ?? key;
  }),
}));

describe("PersonalCourses", () => {
  describe("renders component", () => {
    const defaultProps: CoursesProps = {
      templateLocale: "en",
      personalCourses: {
        courses: {
          en: [
            {
              course: "Course",
              description: "Description",
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
      render(<PersonalCourses {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByText("Course")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("2020 - 2021")).toBeInTheDocument();
    });

    it("when isCurrent is true", () => {
      const props: CoursesProps = {
        ...defaultProps,
        personalCourses: {
          ...defaultProps.personalCourses,
          courses: {
            ...defaultProps.personalCourses.courses,
            en: [
              {
                ...defaultProps.personalCourses.courses.en[0],
                isCurrent: true,
              },
            ],
          },
        },
      };
      renderComponent(props);

      expect(screen.getByText("Course")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("2020 - present")).toBeInTheDocument();
    });
  });
});
