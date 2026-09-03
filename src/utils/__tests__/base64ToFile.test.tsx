import base64ToFile from "../base64ToFile";

describe("base64ToFile", () => {
  it("converts base64 string to File", async () => {
    const base64String = "data:image/jpeg;base64,abc123";
    const filename = "user.jpeg";
    const mimeType = "image/jpeg";

    const blob = new Blob(["image data"], { type: mimeType });

    global.fetch = jest.fn().mockResolvedValue({
      blob: jest.fn().mockResolvedValue(blob),
    });

    const result = await base64ToFile(base64String, filename, mimeType);

    expect(fetch).toHaveBeenCalledWith(base64String);

    expect(result).toBeInstanceOf(File);
    expect(result.name).toBe(filename);
    expect(result.type).toBe(mimeType);
    expect(result.size).toBe(blob.size);
  });
});
