import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import DatePicker from "../";

describe("DatePicker", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "data-picker--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<DatePicker {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByRole("data-picker")).toBeInTheDocument();
      expect(screen.getByRole("data-picker")).toHaveClass(
        "data-picker data-picker--class"
      );
    });
  });
});
