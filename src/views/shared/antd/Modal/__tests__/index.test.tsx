import { render, screen } from "@testing-library/react";
import type { ModalProps } from "antd";

import Modal from "../";

jest.mock("antd", () => ({
  Modal: ({ children, open, ...props }: any) => (
    <div {...props} data-open={open}>
      {children}
    </div>
  ),
}));

describe("Modal", () => {
  describe("renders component", () => {
    const defaultProps: ModalProps = {
      classNames: "modal--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Modal {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(screen.getByTestId("modal")).toHaveClass("modal", "modal--class");
    });

    it("renders modal as open", () => {
      renderComponent();

      expect(screen.getByTestId("modal")).toHaveAttribute("data-open", "true");
    });
  });
});
