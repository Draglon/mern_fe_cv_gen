import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Divider from "../";

describe("Divider", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "divider--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Divider {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByRole("divider")).toBeInTheDocument();
      expect(screen.getByRole("divider")).toHaveClass("divider divider--class");
    });
  });
});
