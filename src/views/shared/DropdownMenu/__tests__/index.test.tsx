import { render, screen, fireEvent } from "@testing-library/react";

import DropdownMenu, { DropdownMenuProps } from "../";
import stopPropagation from "@/utils/stopPropagation";

const dropdownMock = jest.fn();

jest.mock("react-remove-scroll", () => ({
  RemoveScroll: ({ enabled, children }: any) => (
    <div data-testid="remove-scroll" data-enabled={enabled}>
      {children}
    </div>
  ),
}));

jest.mock("@/utils/stopPropagation", () => jest.fn());

jest.mock("@/views/shared/antd/Dropdown", () => ({
  __esModule: true,
  default: (props: any) => {
    dropdownMock(props);

    return (
      <div data-testid="dropdown">
        {props.children}

        <button onClick={() => props.onOpenChange(true)}>Open</button>

        <button onClick={() => props.onOpenChange(false)}>Close</button>
      </div>
    );
  },
}));

describe("DropdownMenu", () => {
  const defaultProps: DropdownMenuProps = {
    icon: <span>Icon</span>,
    items: [
      {
        key: "1",
        label: "Edit",
      },
    ],
  };

  const renderComponent = (props = defaultProps) =>
    render(<DropdownMenu {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders icon", () => {
    renderComponent();

    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  it("passes items to Dropdown", () => {
    renderComponent();

    expect(dropdownMock).toHaveBeenCalledWith(
      expect.objectContaining({
        menu: { items: defaultProps.items },
      })
    );
  });

  it("is closed by default", () => {
    renderComponent();

    expect(screen.getByTestId("remove-scroll")).toHaveAttribute(
      "data-enabled",
      "false"
    );
  });

  it("opens dropdown", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Open"));

    expect(screen.getByTestId("remove-scroll")).toHaveAttribute(
      "data-enabled",
      "true"
    );
  });

  it("closes dropdown", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Open"));
    fireEvent.click(screen.getByText("Close"));

    expect(screen.getByTestId("remove-scroll")).toHaveAttribute(
      "data-enabled",
      "false"
    );
  });

  it("calls stopPropagation when shouldStopPropagation is true", () => {
    renderComponent({
      ...defaultProps,
      shouldStopPropagation: true,
    });

    fireEvent.click(screen.getByTestId("btn-stop-propagation"));

    expect(stopPropagation).toHaveBeenCalled();
  });

  it("does not call stopPropagation by default", () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("btn-stop-propagation"));

    expect(stopPropagation).not.toHaveBeenCalled();
  });
});
