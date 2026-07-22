import { render, screen } from "@testing-library/react";

import Form from "../";

describe("Form", () => {
  const defaultProps = {
    className: "form--class",
    children: <div data-testid="content">Content</div>,
  };

  const renderComponent = (props = defaultProps) => render(<Form {...props} />);

  it("renders with default props", () => {
    const { container } = renderComponent();

    const form = container.querySelector(".form");

    expect(form).toBeInTheDocument();
    expect(form).toHaveClass("form", "form--class");
  });

  it("renders children", () => {
    renderComponent();

    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders without custom className", () => {
    const { container } = render(
      <Form>
        <div>Content</div>
      </Form>
    );

    const form = container.querySelector(".form");

    expect(form).toBeInTheDocument();
    expect(form).toHaveClass("form");
  });
});
