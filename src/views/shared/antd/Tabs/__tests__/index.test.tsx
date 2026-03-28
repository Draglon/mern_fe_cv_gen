import "@testing-library/jest-dom";
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

      expect(screen.getByTestId("tabs")).toBeInTheDocument();
      // expect(screen.getByTestId("tabs")).toHaveClass("tabs tabs--class");
    });
  });
});
