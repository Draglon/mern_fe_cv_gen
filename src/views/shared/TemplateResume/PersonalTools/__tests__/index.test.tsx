import { render, screen } from "@testing-library/react";

import PersonalTools, { ToolsProps } from "../";

describe("PersonalTools", () => {
  describe("renders component", () => {
    const defaultProps: ToolsProps = {
      templateLocale: "en",
      personalTools: {
        tools: {
          en: [
            {
              tool: "Tool 1",
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
      render(<PersonalTools {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personal-tools-item")).toHaveTextContent(
        "Tool 1"
      );
    });

    it("when tool has visible is false", () => {
      const props: ToolsProps = {
        ...defaultProps,
        personalTools: {
          ...defaultProps.personalTools,
          tools: {
            ...defaultProps.personalTools.tools,
            en: [
              {
                ...defaultProps.personalTools.tools.en[0],
                visible: false,
              },
            ],
          },
        },
      };
      renderComponent(props);

      expect(
        screen.queryByTestId("personal-tools-item")
      ).not.toBeInTheDocument();
    });
  });
});
