import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DropdownMenuItem, { DropdownMenuItemProps } from "../";

const buttonMock = jest.fn();
const linkMock = jest.fn();
const contentMock = jest.fn();

jest.mock("@/views/shared/antd/Button", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => {
    buttonMock(props);

    return <button {...props}>{children}</button>;
  },
}));

jest.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, legacyBehavior, ...props }: any) => {
    linkMock({ href, ...props });

    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

jest.mock("../Content", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => {
    contentMock(props);

    return <span>{children}</span>;
  },
}));

describe("DropdownMenuItem", () => {
  const defaultProps: DropdownMenuItemProps = {
    id: "item-1",
    children: "Profile",
  };

  const renderComponent = (props = defaultProps) =>
    render(<DropdownMenuItem {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders button by default", () => {
    renderComponent();

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders Next Link", () => {
    renderComponent({
      ...defaultProps,
      isNextLink: true,
      href: "/profile",
    });

    expect(screen.getByTestId("next-link")).toBeInTheDocument();

    expect(linkMock).toHaveBeenCalledWith(
      expect.objectContaining({
        href: "/profile",
      })
    );
  });

  it("passes props to Button", () => {
    renderComponent();

    expect(buttonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "item-1",
        type: "text",
        color: "default",
        disabled: undefined,
      })
    );
  });

  it("passes props to Content", () => {
    renderComponent({
      ...defaultProps,
      itemTextClassNames: "text-class",
      iconLeft: <span>Left</span>,
      iconRight: <span>Right</span>,
    });

    expect(contentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        itemTextClassNames: "text-class",
        iconLeft: expect.any(Object),
        iconRight: expect.any(Object),
      })
    );
  });

  it("calls onClick", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    const props = {
      ...defaultProps,
      onClick,
    };
    renderComponent(props);

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("passes disabled prop", () => {
    renderComponent({
      ...defaultProps,
      disabled: true,
    });

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("passes props to link", () => {
    renderComponent({
      ...defaultProps,
      isLink: true,
      href: "/profile",
    });

    expect(screen.getByTestId("link")).toBeInTheDocument();
  });
});
