import "@testing-library/jest-dom";
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

      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).toHaveClass(
        "checkbox checkbox--class"
      );
    });
  });
});
