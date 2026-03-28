import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Dropdown from "../";

describe("Dropdown", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "dropdown--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Dropdown {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByRole("dropdown")).toBeInTheDocument();
      expect(screen.getByRole("dropdown")).toHaveClass(
        "dropdown dropdown--class"
      );
    });
  });
});
