import instance from "../axios";

const localStorageMock = {
  getItem: jest.fn(() => "mock-token"),
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Axios Request Interceptor", () => {
  it("should add an Authorization header to requests", () => {
    const config = { headers: {} };
    const modifiedConfig = instance.interceptors.request.handlers[0].fulfilled(config);

    expect(modifiedConfig.headers.Authorization).toBe("Bearer mock-token");
    expect(localStorageMock.getItem).toHaveBeenCalledWith("token");
  });
});