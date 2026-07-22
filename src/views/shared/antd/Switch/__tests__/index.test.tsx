import { render, screen } from "@testing-library/react";

import Switch from "../";

describe("Select", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "switch--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Switch {...props} />);

    it("with default props", () => {
      renderComponent();

      const antdSwitch = screen.getByTestId("switch");

      expect(antdSwitch).toBeInTheDocument();
      expect(antdSwitch).toHaveClass("switch", "switch--class", "switch-root");
    });
  });
});
