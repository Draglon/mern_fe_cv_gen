import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import PersonalPhoto from "../";

describe("PersonalPhoto", () => {
  describe("renders component", () => {
    const defaultProps = {
      src: "/personal_photo_src",
      alt: "personal photo alt text",
      width: 200,
      height: 200,
    };

    const renderComponent = (props = defaultProps) =>
      render(<PersonalPhoto {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("personalPhotoImg")).toHaveClass(
        "personal-photo__img"
      );
      expect(screen.getByTestId("personalPhotoImg")).toHaveAttribute(
        "alt",
        defaultProps.alt
      );
    });
  });
});
