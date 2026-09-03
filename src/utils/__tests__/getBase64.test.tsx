import getBase64 from "../getBase64";

describe("getBase64", () => {
  it("returns base64 when FileReader succeeds", async () => {
    const file = new File(["test"], "test.jpg", {
      type: "image/jpeg",
    });

    const mockFileReader = {
      result: "data:image/jpeg;base64,abc123",
      onload: null as (() => void) | null,
      onerror: null as ((error: unknown) => void) | null,
      readAsDataURL: jest.fn(),
    };

    jest
      .spyOn(window, "FileReader")
      .mockImplementation(() => mockFileReader as unknown as FileReader);

    const promise = getBase64(file as any);

    mockFileReader.onload?.();

    await expect(promise).resolves.toBe("data:image/jpeg;base64,abc123");

    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file);
  });

  it("rejects when FileReader fails", async () => {
    const file = new File(["test"], "test.jpg", {
      type: "image/jpeg",
    });

    const error = new Error("FileReader error");

    const mockFileReader = {
      result: null,
      onload: null as (() => void) | null,
      onerror: null as ((error: unknown) => void) | null,
      readAsDataURL: jest.fn(),
    };

    jest
      .spyOn(window, "FileReader")
      .mockImplementation(() => mockFileReader as unknown as FileReader);

    const promise = getBase64(file as any);

    mockFileReader.onerror?.(error);

    await expect(promise).rejects.toBe(error);

    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file);
  });
});
