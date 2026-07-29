import { render, screen } from "@testing-library/react";

import NavigationLink from "../";

const mockUsePathname = jest.fn();

jest.mock("@/i18n/navigation", () => ({
  __esModule: true,
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  usePathname: () => mockUsePathname(),
}));

describe("NavigationLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders link", () => {
    mockUsePathname.mockReturnValue("/resume");

    render(<NavigationLink href="/resume">Resume</NavigationLink>);

    expect(screen.getByRole("link", { name: "Resume" })).toBeInTheDocument();
  });

  it("passes href", () => {
    mockUsePathname.mockReturnValue("/");

    render(<NavigationLink href="/resume">Resume</NavigationLink>);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/resume");
  });

  it("adds active class when pathname matches href", () => {
    mockUsePathname.mockReturnValue("/resume");

    render(
      <NavigationLink href="/resume" className="nav-link">
        Resume
      </NavigationLink>
    );

    expect(screen.getByRole("link")).toHaveClass("nav-link", "active");
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("does not add active class when pathname does not match href", () => {
    mockUsePathname.mockReturnValue("/settings");

    render(
      <NavigationLink href="/resume" className="nav-link">
        Resume
      </NavigationLink>
    );

    expect(screen.getByRole("link")).toHaveClass("nav-link");
    expect(screen.getByRole("link")).not.toHaveClass("active");
    expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
  });
});
