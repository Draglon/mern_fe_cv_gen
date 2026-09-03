import base64ToFile from "@/utils/base64ToFile";

import convertBase64ToFile from "../convertBase64ToFile";

jest.mock("@/utils/base64ToFile");

const mockedBase64ToFile = jest.mocked(base64ToFile);

describe("convertBase64ToFile", () => {
  const base64Image = "data:image/jpeg;base64,abc123";
  const initialFileObject = new File(["test"], "user.jpeg", {
    type: "image/jpeg",
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockedBase64ToFile.mockReturnValue(initialFileObject as any);
  });

  it("converts base64 image to UploadFile", () => {
    const result = convertBase64ToFile([base64Image]);

    expect(mockedBase64ToFile).toHaveBeenCalledWith(
      base64Image,
      "user.jpeg",
      "image/jpeg"
    );

    expect(result).toEqual([
      {
        uid: "-1",
        name: "user.jpeg",
        status: "done",
        url: base64Image,
        originFileObj: initialFileObject,
      },
    ]);
  });

  it("uses the first item from fileList", () => {
    const secondBase64Image = "data:image/jpeg;base64,second";

    convertBase64ToFile([base64Image, secondBase64Image]);

    expect(mockedBase64ToFile).toHaveBeenCalledWith(
      base64Image,
      "user.jpeg",
      "image/jpeg"
    );
  });
});
