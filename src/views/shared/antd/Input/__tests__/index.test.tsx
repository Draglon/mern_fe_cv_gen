import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Input from "../";

describe("Input", () => {
  describe("renders component", () => {
    const defaultProps = {
      classNames: "input--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Input {...props} />);

    it("renders with default props", () => {
      renderComponent();

      const input = screen.getByTestId("input");

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveClass("input", "input--class");
    });

    it("renders password input", () => {
      const props = { ...defaultProps, type: "password" };
      renderComponent(props);

      const inputPassword = screen.getByTestId("inputPassword");

      expect(inputPassword).toBeInTheDocument();
      expect(inputPassword).toHaveAttribute("type", "password");

      const wrapper = inputPassword.closest(".ant-input-password");

      expect(wrapper).toHaveClass("input", "input--class");
    });
  });
});
