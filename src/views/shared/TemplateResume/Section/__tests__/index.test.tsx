import { render, screen } from "@testing-library/react";

import Section, { SectionProps } from "../";

describe("Section", () => {
  describe("renders component", () => {
    const defaultProps: SectionProps = {
      children: <div>Content</div>,
    };

    const renderComponent = (props = defaultProps) =>
      render(<Section {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("section")).toHaveTextContent("Content");
    });

    it("with section title", () => {
      const props = {
        ...defaultProps,
        title: "Title",
      };
      renderComponent(props);

      expect(screen.getByTestId("section")).toHaveTextContent("Content");
      expect(screen.getByTestId("section-header")).toHaveTextContent("Title");
    });

    it("when section title is small", () => {
      const props = {
        ...defaultProps,
        title: "Title",
        size: "small",
      };
      renderComponent(props);

      expect(screen.getByTestId("section")).toHaveTextContent("Content");
      expect(screen.getByTestId("section-header")).toHaveTextContent("Title");
    });

    it("when section with title and description", () => {
      const props = {
        ...defaultProps,
        title: "Title",
        text: "Description",
      };
      renderComponent(props);

      expect(screen.getByTestId("section")).toHaveTextContent("Content");
      expect(screen.getByTestId("section-header")).toHaveTextContent("Title");
      expect(screen.getByTestId("section-header")).toHaveTextContent(
        "Description"
      );
    });
  });
});
