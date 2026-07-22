import { render, screen } from "@testing-library/react";

import Select from "../";

describe("Select", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "select--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Select {...props} />);

    it("with default props", () => {
      renderComponent();

      const select = screen.getByTestId("select");

      expect(select).toBeInTheDocument();
      expect(select).toHaveClass("select", "select--class");
    });
  });
});
