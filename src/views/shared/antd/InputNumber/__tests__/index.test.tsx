import { render, screen } from "@testing-library/react";

import InputNumber from "../";

describe("Input", () => {
  describe("renders component", () => {
    const defaultProps = {
      classNames: "input-number--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<InputNumber {...props} />);

    it("renders with default props", () => {
      renderComponent();

      const inputNumber = screen.getByTestId("inputNumber");

      expect(inputNumber).toBeInTheDocument();

      const wrapper = inputNumber.closest(".ant-input-number");

      expect(wrapper).toHaveClass("input-number", "input-number--class");
    });
  });
});
