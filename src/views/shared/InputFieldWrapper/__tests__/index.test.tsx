import { render, screen } from "@testing-library/react";

import InputFieldWrapper from "../";

describe("InputFieldWrapper", () => {
  describe("renders component", () => {
    const defaultProps = {
      children: <input type="text" data-testid="input" />,
    };

    const renderComponent = (props = defaultProps) =>
      render(<InputFieldWrapper {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("input-field")).toBeInTheDocument();
      expect(screen.getByTestId("input")).toBeInTheDocument();

      expect(screen.queryByTestId("input-field-label")).not.toBeInTheDocument();
      expect(screen.queryByTestId("input-field-error")).not.toBeInTheDocument();
    });

    it("with label", () => {
      const props = {
        ...defaultProps,
        label: "Label",
      };
      renderComponent(props);

      expect(screen.getByTestId("input-field")).toBeInTheDocument();
      expect(screen.getByTestId("input-field-label")).toHaveTextContent(
        "Label"
      );
      expect(screen.getByTestId("input")).toBeInTheDocument();

      expect(screen.queryByTestId("input-field-error")).not.toBeInTheDocument();
    });

    it("with error", () => {
      const props = {
        ...defaultProps,
        errors: {
          type: "error",
          message: "Error message",
        },
      };
      renderComponent(props);

      expect(screen.getByTestId("input-field")).toBeInTheDocument();
      expect(screen.getByTestId("input-field-error")).toHaveTextContent(
        "Error message"
      );
      expect(screen.getByTestId("input-field-error")).toBeInTheDocument();
      expect(screen.getByTestId("input")).toBeInTheDocument();

      expect(screen.queryByTestId("input-field-label")).not.toBeInTheDocument();
    });
  });
});
