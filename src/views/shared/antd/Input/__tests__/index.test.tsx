import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Input from "../";

describe("Input", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "input--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Input {...props} />);

    it("with default props", () => {
      renderComponent();

      screen.debug();

      expect(screen.getByRole("input")).toBeInTheDocument();
      expect(screen.getByRole("input")).toHaveClass("input input--class");
      expect(screen.getByRole("input")).toHaveAttribute("type", "text");
    });

    it("with default props", () => {
      const props = {
        ...defaultProps,
        type: "password",
      };
      renderComponent(props);

      expect(screen.getByRole("input")).toBeInTheDocument();
      expect(screen.getByRole("input")).toHaveClass("input input--class");
      expect(screen.getByRole("input")).toHaveAttribute("type", "password");
    });
  });
});
