import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import TextArea from "../";

describe("TextArea", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "text-area--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<TextArea {...props} />);

    it("with default props", () => {
      renderComponent();

      screen.debug();

      expect(screen.getByTestId("text-area")).toBeInTheDocument();
      expect(screen.getByTestId("text-area")).toHaveClass(
        "text-area text-area--class"
      );
    });
  });
});
