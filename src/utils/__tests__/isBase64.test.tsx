import isBase64 from "../isBase64";

describe("isBase64", () => {
  it("returns true for a valid image base64 string", () => {
    expect(isBase64("data:image/png;base64,iVBORw0KGgo=")).toBe(true);
  });

  it("returns true for an image type containing uppercase letters", () => {
    expect(isBase64("data:image/JPEG;base64,/9j/4AAQSkZJRg==")).toBe(true);
  });

  it("returns true for an image type containing +", () => {
    expect(isBase64("data:image/svg+xml;base64,PHN2ZyB4bWxucz0i")).toBe(true);
  });

  it("returns false for a non-string value", () => {
    expect(isBase64(null)).toBe(false);
    expect(isBase64(undefined)).toBe(false);
    expect(isBase64(123)).toBe(false);
    expect(isBase64({})).toBe(false);
    expect(isBase64([])).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isBase64("")).toBe(false);
  });

  it("returns false for a string without base64 prefix", () => {
    expect(isBase64("iVBORw0KGgo=")).toBe(false);
  });

  it("returns false for a non-image data URL", () => {
    expect(isBase64("data:text/plain;base64,SGVsbG8=")).toBe(false);
  });

  it("returns false when base64 marker is missing", () => {
    expect(isBase64("data:image/png,iVBORw0KGgo=")).toBe(false);
  });
});
