import { render, screen } from "@testing-library/react";

import Checkbox from "../";

describe("Checkbox", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "checkbox--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Checkbox {...props} />);

    it("with default props", () => {
      renderComponent();

      const checkbox = screen.getByTestId("checkbox");
      const wrapper = checkbox.closest(".checkbox");

      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass("checkbox", "checkbox--class");
    });
  });
});
