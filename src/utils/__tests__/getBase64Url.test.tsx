import type { UploadFile } from "antd";

import getBase64 from "../getBase64";
import getBase64Url from "../getBase64Url";

jest.mock("../getBase64");

const mockedGetBase64 = jest.mocked(getBase64);

describe("getUrl", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns url when it is present", async () => {
    const file = {
      url: "https://example.com/image.jpg",
    } as UploadFile;

    await expect(getBase64Url(file)).resolves.toBe(file.url);

    expect(mockedGetBase64).not.toHaveBeenCalled();
  });

  it("returns base64 when url is absent", async () => {
    const originFileObj = new File(["test"], "test.jpg");

    const file = {
      originFileObj,
    } as UploadFile;

    mockedGetBase64.mockResolvedValue("data:image/jpeg;base64,abc123");

    await expect(getBase64Url(file)).resolves.toBe(
      "data:image/jpeg;base64,abc123"
    );

    expect(mockedGetBase64).toHaveBeenCalledWith(originFileObj);
  });
});
