import { render, screen } from "@testing-library/react";

import UIKitLayout from "../";

jest.mock("@/views/layouts/headers/UIKitHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="UIKitHeader" />,
}));

jest.mock("@/views/shared/ModalRoot", () => ({
  __esModule: true,
  default: () => <div data-testid="modalRoot" />,
}));

describe("UIKitLayout", () => {
  describe("renders component", () => {
    const defaultProps = {
      children: <div data-testid="UIKitLayoutContent">Content</div>,
    };

    const renderComponent = (props = defaultProps) =>
      render(<UIKitLayout {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("UIKitHeader")).toBeInTheDocument();
      expect(screen.getByTestId("modalRoot")).toBeInTheDocument();
      expect(screen.getByTestId("UIKitLayoutContent")).toHaveTextContent(
        "Content"
      );
    });
  });
});
