import { render, screen } from "@testing-library/react";

import Loader from "../";

describe("Loader", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "loader--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Loader {...props} />);

    it("with default props", () => {
      renderComponent();

      const element = screen.getByTestId("loader");

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass("loader loader--class");
    });
  });
});
