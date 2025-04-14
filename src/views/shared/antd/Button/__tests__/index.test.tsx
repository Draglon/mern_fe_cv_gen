import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Button from "../";

describe("Button", () => {
  describe("renders component", () => {
    const defaultProps = {
      children: "Text in the button",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Button {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByRole("button")).toHaveClass("button button--primary");
      expect(screen.getByText(defaultProps.children)).toBeInTheDocument();
    });

    it("with classes", () => {
      const props = {
        ...defaultProps,
        className: "test-class",
      };
      renderComponent(props);

      expect(screen.getByRole("button")).toHaveClass(
        "button button--primary test-class"
      );
      expect(screen.getByText(defaultProps.children)).toBeInTheDocument();
    });
    it("when color is danger", () => {
      const props = {
        ...defaultProps,
        color: "danger",
      };
      renderComponent(props);

      expect(screen.getByRole("button")).toHaveClass("button button--danger");
      expect(screen.getByText(defaultProps.children)).toBeInTheDocument();
    });

    it("when color is default", () => {
      const props = {
        ...defaultProps,
        color: "default",
      };
      renderComponent(props);

      expect(screen.getByRole("button")).toHaveClass("button button--default");
      expect(screen.getByText(defaultProps.children)).toBeInTheDocument();
    });
  });
});
