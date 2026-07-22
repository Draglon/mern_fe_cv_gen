import { render, screen } from "@testing-library/react";

import TypographyParagraph from "../";

describe("TypographyParagraph", () => {
  const defaultProps = {
    className: "paragraph--class",
    children: "Paragraph text",
  };

  const renderComponent = (props = defaultProps) =>
    render(<TypographyParagraph {...props} />);

  it("renders children", () => {
    renderComponent();

    expect(screen.getByText("Paragraph text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = renderComponent();

    const paragraph = container.querySelector(".paragraph");

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("paragraph", "paragraph--class");
  });

  it("renders strong text", () => {
    render(<TypographyParagraph strong>Strong text</TypographyParagraph>);

    expect(screen.getByText("Strong text")).toBeInTheDocument();
  });

  it("renders italic text", () => {
    render(<TypographyParagraph italic>Italic text</TypographyParagraph>);

    expect(screen.getByText("Italic text")).toBeInTheDocument();
  });

  it("renders underlined text", () => {
    render(
      <TypographyParagraph underline>Underlined text</TypographyParagraph>
    );

    expect(screen.getByText("Underlined text")).toBeInTheDocument();
  });

  it("renders danger type", () => {
    const { container } = render(
      <TypographyParagraph type="danger">Danger text</TypographyParagraph>
    );

    expect(container.querySelector(".ant-typography")).toHaveClass("paragraph");
    expect(screen.getByText("Danger text")).toBeInTheDocument();
  });
});
