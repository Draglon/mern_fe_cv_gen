import { render, screen } from "@testing-library/react";

import Tabs from "../";

describe("Tabs", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "tabs--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Tabs {...props} />);

    it("with default props", () => {
      renderComponent();

      const tabs = screen.getByTestId("tabs");

      expect(tabs).toBeInTheDocument();
      expect(tabs).toHaveClass("tabs", "tabs--class");
    });
  });
});
