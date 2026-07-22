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

      const divider = screen.getByRole("separator");

      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass("divider", "divider--class");
    });
  });
});
