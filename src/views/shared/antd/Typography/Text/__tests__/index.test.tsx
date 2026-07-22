import { render, screen } from "@testing-library/react";

import TypographyText from "../";

describe("TypographyText", () => {
  const defaultProps = {
    className: "text--class",
    children: "Text content",
  };

  const renderComponent = (props = defaultProps) =>
    render(<TypographyText {...props} />);

  it("renders children", () => {
    renderComponent();

    expect(screen.getByText("Text content")).toBeInTheDocument();
  });

  it("applies default and custom classes", () => {
    const { container } = renderComponent();

    const text = container.querySelector(".text");

    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("text", "text--class");
  });

  it("renders strong text", () => {
    render(<TypographyText strong>Strong text</TypographyText>);

    expect(screen.getByText("Strong text")).toBeInTheDocument();
  });

  it("renders italic text", () => {
    render(<TypographyText italic>Italic text</TypographyText>);

    expect(screen.getByText("Italic text")).toBeInTheDocument();
  });

  it("renders underlined text", () => {
    render(<TypographyText underline>Underlined text</TypographyText>);

    expect(screen.getByText("Underlined text")).toBeInTheDocument();
  });

  it("renders with danger type", () => {
    const { container } = render(
      <TypographyText type="danger">Danger text</TypographyText>
    );

    const text = container.querySelector(".text");

    expect(text).toBeInTheDocument();
    expect(screen.getByText("Danger text")).toBeInTheDocument();
  });

  it("renders without custom className", () => {
    const { container } = render(<TypographyText>Default text</TypographyText>);

    const text = container.querySelector(".text");

    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("text");
  });
});
