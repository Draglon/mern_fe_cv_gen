import { render, screen } from "@testing-library/react";

import Avatar from "../";

describe("Avatar", () => {
  const defaultProps = {
    className: "avatar--class",
  };

  const renderComponent = (props = defaultProps) =>
    render(<Avatar {...props} />);

  it("renders with default props", () => {
    renderComponent();

    const avatar = screen.getByTestId("avatar");

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("avatar", "avatar--class");
  });
});
