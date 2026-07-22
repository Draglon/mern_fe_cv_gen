import { render, screen } from "@testing-library/react";

import Radio from "../";

describe("Radio", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "radio--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Radio {...props} />);

    it("with default props", () => {
      renderComponent();

      const radio = screen.getByTestId("inputRadio");
      const wrapper = radio.closest(".radio");

      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass("radio", "radio--class");
    });
  });
});
