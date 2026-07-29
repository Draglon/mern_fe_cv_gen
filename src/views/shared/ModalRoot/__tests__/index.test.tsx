import { render, screen } from "@testing-library/react";

import ModalRoot from "../";
import { useAppSelector } from "@/store/hooks";

jest.mock("@/store/hooks", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("../modalComponents", () => ({
  __esModule: true,
  default: {
    TEST_MODAL: (props: any) => (
      <div data-testid="test-modal">{props.title}</div>
    ),
  },
}));

const mockedUseAppSelector = jest.mocked(useAppSelector);

describe("ModalRoot", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when modalType is empty", () => {
    mockedUseAppSelector.mockReturnValue({
      modalType: null,
      modalProps: {},
    });

    const { container } = render(<ModalRoot />);

    expect(container.firstChild).toBeNull();
  });

  it("renders selected modal", () => {
    mockedUseAppSelector.mockReturnValue({
      modalType: "TEST_MODAL",
      modalProps: {},
    });

    render(<ModalRoot />);

    expect(screen.getByTestId("test-modal")).toBeInTheDocument();
  });

  it("passes modal props", () => {
    mockedUseAppSelector.mockReturnValue({
      modalType: "TEST_MODAL",
      modalProps: {
        title: "Delete user",
      },
    });

    render(<ModalRoot />);

    expect(screen.getByText("Delete user")).toBeInTheDocument();
  });
});
