import { render, screen, fireEvent } from "@testing-library/react";

import UploadFileComponent from "../";
import convertBase64ToFile from "@/utils/convertBase64ToFile";

jest.mock("antd-img-crop", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const UploadMock = jest.fn();

jest.mock("antd", () => ({
  Upload: (props: any) => {
    UploadMock(props);

    return (
      <div data-testid="upload">
        <button
          onClick={() =>
            props.onChange?.({
              fileList: [{ uid: "1", name: "file.png" }],
            })
          }
        >
          Change
        </button>

        {props.children}
      </div>
    );
  },
}));

jest.mock("@/utils/convertBase64ToFile");

describe("UploadFileComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders upload button", () => {
    render(<UploadFileComponent />);

    expect(screen.getByText("Upload")).toBeInTheDocument();
  });

  it("passes default props to Upload", () => {
    render(<UploadFileComponent />);

    expect(UploadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        className: expect.stringContaining("upload-file"),
        listType: "picture-circle",
        disabled: false,
        maxCount: 1,
      })
    );
  });

  it("calls convertBase64ToFile when fileList contains base64 strings", () => {
    (convertBase64ToFile as jest.Mock).mockReturnValue([
      { uid: "1", name: "avatar.png" },
    ]);

    render(<UploadFileComponent fileList={["base64"]} />);

    expect(convertBase64ToFile).toHaveBeenCalledWith(["base64"]);
  });

  it("does not call convertBase64ToFile for UploadFile objects", () => {
    render(
      <UploadFileComponent
        fileList={[{ uid: "1", name: "avatar.png" }] as any}
      />
    );

    expect(convertBase64ToFile).not.toHaveBeenCalled();
  });

  it("calls onChange", () => {
    const onChange = jest.fn();

    render(<UploadFileComponent onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Change" }));

    expect(onChange).toHaveBeenCalledWith([{ uid: "1", name: "file.png" }]);
  });

  it("hides Upload button when maxCount is reached", () => {
    render(
      <UploadFileComponent
        maxCount={1}
        fileList={[{ uid: "1", name: "file.png" }] as any}
      />
    );

    expect(screen.queryByText("Upload")).not.toBeInTheDocument();
  });

  it("shows Upload button when maxCount is not reached", () => {
    render(
      <UploadFileComponent
        maxCount={2}
        fileList={[{ uid: "1", name: "file.png" }] as any}
      />
    );

    expect(screen.getByText("Upload")).toBeInTheDocument();
  });
});
