import { render, screen } from "@testing-library/react";

import ThemeProvider from "../themeProvider";

jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

describe("ThemeProvider", () => {
  it("renders children", () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Child</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
