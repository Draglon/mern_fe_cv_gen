import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Avatar from "../";

describe("Avatar", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "avatar--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Avatar {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByRole("avatar")).toBeInTheDocument();
      expect(screen.getByRole("avatar")).toHaveClass("avatar avatar--class");
    });
  });
});
