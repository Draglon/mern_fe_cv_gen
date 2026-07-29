import { render, screen } from "@testing-library/react";

import ConfirmModal from "../";
import { hideModal as hideModalAction } from "@/store/modal/actions";

const dispatchMock = jest.fn();
const modalMock = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/store/hooks", () => ({
  useAppDispatch: () => dispatchMock,
}));

jest.mock("@/store/modal/actions", () => ({
  hideModal: jest.fn(() => ({ type: "hideModal" })),
}));

jest.mock("@/views/shared/antd/Modal", () => ({
  __esModule: true,
  default: (props: any) => {
    modalMock(props);

    return <div data-testid="modal">{props.children}</div>;
  },
}));

describe("ConfirmModal", () => {
  const defaultProps = {
    okText: "Ok",
    cancelText: "Cancel",
    onConfirm: jest.fn(),
    content: <div>Content</div>,
  };

  const renderComponent = (props = defaultProps) =>
    render(<ConfirmModal {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders content", () => {
    renderComponent();

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("passes props to Modal", () => {
    renderComponent();

    expect(modalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        okText: "Ok",
        cancelText: "Cancel",
        onOk: defaultProps.onConfirm,
        onCancel: expect.any(Function),
        children: defaultProps.content,
      })
    );
  });

  it("uses translated texts by default", () => {
    render(<ConfirmModal />);

    expect(modalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        okText: "confirm",
        cancelText: "cancel",
      })
    );
  });

  it("uses hideModal as default onOk handler", () => {
    render(<ConfirmModal />);

    const { onOk } = modalMock.mock.calls[0][0];

    onOk();

    expect(hideModalAction).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith({ type: "hideModal" });
  });

  it("calls dispatch onCancel", () => {
    render(<ConfirmModal />);

    const { onCancel } = modalMock.mock.calls[0][0];

    onCancel();

    expect(hideModalAction).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith({ type: "hideModal" });
  });

  it("uses custom onConfirm instead of default handler", () => {
    const onConfirm = jest.fn();

    renderComponent({
      ...defaultProps,
      onConfirm,
    });

    const { onOk } = modalMock.mock.calls[0][0];

    onOk();

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
