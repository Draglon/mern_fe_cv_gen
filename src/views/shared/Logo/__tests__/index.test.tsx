import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Logo from "../";

describe("Logo", () => {
  describe("renders component", () => {
    const renderComponent = () => render(<Logo />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("logoImg")).toHaveClass("logo__img");
    });
  });
});
