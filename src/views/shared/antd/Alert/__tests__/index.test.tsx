import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { ALERT_KINDS } from "@/lib/constants/alert";
import Alert from "../";

describe("Alert", () => {
  describe("renders component", () => {
    const defaultProps = {
      message: "Text message",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Alert {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveClass("alert");
      expect(screen.getByText("Text message")).toBeInTheDocument();
    });

    it("when type is info", () => {
      const props = {
        ...defaultProps,
        type: ALERT_KINDS.info,
      };
      renderComponent(props);

      expect(screen.getByRole("alert")).toHaveClass("alert alert--info");
    });

    it("when type is success", () => {
      const props = {
        ...defaultProps,
        type: ALERT_KINDS.success,
      };
      renderComponent(props);

      expect(screen.getByRole("alert")).toHaveClass("alert alert--success");
    });

    it("when type is warning", () => {
      const props = {
        ...defaultProps,
        type: ALERT_KINDS.warning,
      };
      renderComponent(props);

      expect(screen.getByRole("alert")).toHaveClass("alert alert--warning");
    });

    it("when type is error", () => {
      const props = {
        ...defaultProps,
        type: ALERT_KINDS.error,
      };
      renderComponent(props);

      expect(screen.getByRole("alert")).toHaveClass("alert alert--error");
    });
  });
});
