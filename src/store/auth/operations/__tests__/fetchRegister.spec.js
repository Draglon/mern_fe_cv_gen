import axios from "@/lib/axios";
import { authRegistrationRoute } from "@/lib/apiRoutes";

import fetchRegisterOperation from "../fetchRegister";

jest.mock("@/lib/axios");

const mockedAxios = jest.mocked(axios);

describe("fetchRegisterOperation", () => {
  const params = {
    userName: "JohnDoe",
    email: "example@gmail.com",
    password: "P123456",
    locale: "en",
  };

  const responseData = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
    user: {
      id: "1",
      email: "test@example.com",
    },
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should registration successfully", async () => {
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const result = await fetchRegisterOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(authRegistrationRoute, params);
    expect(result.type).toBe(fetchRegisterOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Registration failed");

    mockedAxios.post.mockRejectedValue(error);

    const result = await fetchRegisterOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(authRegistrationRoute, params);
    expect(result.type).toBe(fetchRegisterOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
