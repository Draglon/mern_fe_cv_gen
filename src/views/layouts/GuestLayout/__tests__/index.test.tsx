import { render, screen } from "@testing-library/react";

import GuestLayout from "../";

jest.mock("@/views/layouts/headers/GuestHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="guestHeader" />,
}));

jest.mock("@/views/shared/ModalRoot", () => ({
  __esModule: true,
  default: () => <div data-testid="modalRoot" />,
}));

describe("GuestLayout", () => {
  describe("renders component", () => {
    const defaultProps = {
      children: <div data-testid="guestLayoutContent">Content</div>,
    };

    const renderComponent = (props = defaultProps) =>
      render(<GuestLayout {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("guestHeader")).toBeInTheDocument();
      expect(screen.getByTestId("modalRoot")).toBeInTheDocument();
      expect(screen.getByTestId("guestLayoutContent")).toHaveTextContent(
        "Content"
      );
    });
  });
});
