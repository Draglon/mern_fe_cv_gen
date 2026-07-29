import { render, screen } from "@testing-library/react";

import DropdownMenuItemContent from "../";

describe("DropdownMenuItemContent", () => {
  describe("renders component", () => {
    const defaultProps = {
      children: <span>Content</span>,
    };

    const renderComponent = (props = defaultProps) =>
      render(<DropdownMenuItemContent {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("dropdown-text")).toBeInTheDocument();
      expect(
        screen.queryByTestId("dropdown-icon-left")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("dropdown-icon-right")
      ).not.toBeInTheDocument();
    });

    it("with iconLeft", () => {
      const props = {
        ...defaultProps,
        iconLeft: <i className="icon-left" />,
      };
      renderComponent(props);

      expect(screen.getByTestId("dropdown-text")).toBeInTheDocument();
      expect(screen.queryByTestId("dropdown-icon-left")).toBeInTheDocument();
      expect(
        screen.queryByTestId("dropdown-icon-right")
      ).not.toBeInTheDocument();
    });

    it("with iconRight", () => {
      const props = {
        ...defaultProps,
        iconRight: <i className="icon-right" />,
      };
      renderComponent(props);

      expect(screen.getByTestId("dropdown-text")).toBeInTheDocument();
      expect(
        screen.queryByTestId("dropdown-icon-left")
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("dropdown-icon-right")).toBeInTheDocument();
    });

    it("with itemTextClassNames", () => {
      const props = {
        ...defaultProps,
        itemTextClassNames: "dropdown__text-class",
      };
      renderComponent(props);

      expect(screen.getByTestId("dropdown-text")).toBeInTheDocument();
      expect(screen.getByTestId("dropdown-text")).toHaveClass(
        "dropdown__text",
        "dropdown__text-class"
      );
    });
  });
});
