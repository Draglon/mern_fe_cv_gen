import { render } from "@testing-library/react";

import Skeleton from "../";

describe("Skeleton", () => {
  describe("renders component", () => {
    const defaultProps = {
      className: "skeleton--class",
    };

    const renderComponent = (props = defaultProps) =>
      render(<Skeleton {...props} />);

    it("with default props", () => {
      const { container } = renderComponent();

      const skeleton = container.querySelector(".skeleton");

      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("skeleton", "skeleton--class");
    });
  });
});
