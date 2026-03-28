import "@testing-library/jest-dom";
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

      expect(screen.getByTestId("loader")).toBeInTheDocument();
      expect(screen.getByTestId("loader")).toHaveClass("loader loader--class");
    });
  });
});
