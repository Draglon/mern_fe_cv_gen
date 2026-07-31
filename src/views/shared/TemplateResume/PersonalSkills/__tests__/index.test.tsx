import { render, screen } from "@testing-library/react";

import PersonalSkills, { SkillsProps } from "../";

describe("PersonalSkills", () => {
  describe("renders component", () => {
    const defaultProps: SkillsProps = {
      templateLocale: "en",
      personalSkills: {
        skills: {
          en: [
            {
              skill: "Skill 1",
              level: "100",
              visible: true,
            },
          ],
          ua: [],
          ru: [],
        },
      },
    };

    const renderComponent = (props = defaultProps) =>
      render(<PersonalSkills {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-skills-item")).toHaveTextContent(
        "Skill 1"
      );
    });

    it("when skill has visible is false", () => {
      const props: SkillsProps = {
        ...defaultProps,
        personalSkills: {
          ...defaultProps.personalSkills,
          skills: {
            ...defaultProps.personalSkills.skills,
            en: [
              {
                ...defaultProps.personalSkills.skills.en[0],
                visible: false,
              },
            ],
          },
        },
      };
      renderComponent(props);

      expect(
        screen.queryByTestId("personal-skills-item")
      ).not.toBeInTheDocument();
    });
  });
});
