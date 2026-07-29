import { render, screen } from "@testing-library/react";

import UploadFileField, { UploadFileFieldProps } from "../";

const uploadFileMock = jest.fn();
jest.mock("@/views/shared/antd/UploadFile", () => ({
  __esModule: true,
  default: (props: any) => {
    uploadFileMock(props);

    return <div data-testid="upload-file" />;
  },
}));

describe("UploadFileField", () => {
  const defaultProps: UploadFileFieldProps = {
    label: "Avatar",
    value: [],
  };

  const renderComponent = (props = defaultProps) =>
    render(<UploadFileField {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders upload file", () => {
    renderComponent();

    expect(screen.getByTestId("upload-file")).toBeInTheDocument();
  });

  it("renders label", () => {
    renderComponent();

    expect(screen.getByText("Avatar")).toBeInTheDocument();
    expect(screen.getByText("Avatar")).toHaveClass("upload-file-field__label");
  });

  it("does not render label when it is not passed", () => {
    const props = {
      ...defaultProps,
      label: undefined,
    };
    renderComponent(props);

    expect(screen.queryByText("Avatar")).not.toBeInTheDocument();
  });

  it("passes props to UploadFile", () => {
    const props: UploadFileFieldProps = {
      ...defaultProps,
      value: [
        {
          uid: "1",
          name: "avatar.png",
        },
      ],
    };
    renderComponent(props);

    expect(uploadFileMock).toHaveBeenCalledWith(
      expect.objectContaining({ fileList: props.value })
    );
  });
});
