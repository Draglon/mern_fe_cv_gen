import { render, screen } from "@testing-library/react";

import Resume from "../";

jest.mock("@/views/Resume/TemplatesList", () => ({
  __esModule: true,
  default: () => <div data-testid="templates-list" />,
}));

jest.mock("@/views/Resume/Template", () => ({
  __esModule: true,
  default: () => <div data-testid="template" />,
}));

jest.mock("@/views/Resume/TemplateCustomization", () => ({
  __esModule: true,
  default: () => <div data-testid="template-customization" />,
}));

describe("Resume", () => {
  const renderComponent = () => render(<Resume />);

  it("renders component", () => {
    renderComponent();

    expect(screen.getByTestId("templates-list")).toBeInTheDocument();
    expect(screen.getByTestId("template")).toBeInTheDocument();
    expect(screen.getByTestId("template-customization")).toBeInTheDocument();
  });
});
