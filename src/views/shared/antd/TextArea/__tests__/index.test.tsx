import { render, screen } from "@testing-library/react";

import TextArea from "../";

describe("TextArea", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "textarea--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<TextArea {...props} />);

    it("with default props", () => {
      renderComponent();

      const textArea = screen.getByTestId("textarea");

      expect(textArea).toBeInTheDocument();
      expect(textArea).toHaveClass(
        "textarea",
        "textarea--class",
        "textarea__root"
      );
    });
  });
});
