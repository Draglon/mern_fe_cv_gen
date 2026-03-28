import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Modal from "../";

describe("Modal", () => {
  describe("renders component", () => {
    const defaultProps = {
      classNames: "modal--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Modal {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(screen.getByRole("dialog")).toHaveClass("modal modal--class");
    });
  });
});
