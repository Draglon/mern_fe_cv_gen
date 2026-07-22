import { render, screen } from "@testing-library/react";

import TypographyTitle from "../";

describe("TypographyTitle", () => {
  const defaultProps = {
    className: "title--class",
    children: "Page title",
  };

  const renderComponent = (props = defaultProps) =>
    render(<TypographyTitle {...props} />);

  it("renders children", () => {
    renderComponent();

    expect(screen.getByText("Page title")).toBeInTheDocument();
  });

  it("applies default and custom classes", () => {
    const { container } = renderComponent();

    const title = container.querySelector(".title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("title", "title--class");
  });

  it("renders with level 1", () => {
    render(<TypographyTitle level={1}>Heading 1</TypographyTitle>);

    expect(
      screen.getByRole("heading", { level: 1, name: "Heading 1" })
    ).toBeInTheDocument();
  });

  it("renders with level 3", () => {
    render(<TypographyTitle level={3}>Heading 3</TypographyTitle>);

    expect(
      screen.getByRole("heading", { level: 3, name: "Heading 3" })
    ).toBeInTheDocument();
  });

  it("renders with danger type", () => {
    render(<TypographyTitle type="danger">Danger title</TypographyTitle>);

    expect(screen.getByText("Danger title")).toBeInTheDocument();
  });

  it("renders with italic", () => {
    render(<TypographyTitle italic>Italic title</TypographyTitle>);

    expect(screen.getByText("Italic title")).toBeInTheDocument();
  });

  it("renders with underline", () => {
    render(<TypographyTitle underline>Underline title</TypographyTitle>);

    expect(screen.getByText("Underline title")).toBeInTheDocument();
  });

  it("renders without custom className", () => {
    const { container } = render(
      <TypographyTitle>Default title</TypographyTitle>
    );

    const title = container.querySelector(".title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("title");
  });
});
