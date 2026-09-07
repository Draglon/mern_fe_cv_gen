import axios from "@/lib/axios";
import { authLoginRoute } from "@/lib/apiRoutes";

import fetchAuthOperation from "../fetchAuth";

jest.mock("@/lib/axios");

const mockedAxios = jest.mocked(axios);

describe("fetchAuthOperation", () => {
  const params = {
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

  it("should login successfully", async () => {
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const result = await fetchAuthOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(authLoginRoute, params);
    expect(result.type).toBe(fetchAuthOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Login failed");

    mockedAxios.post.mockRejectedValue(error);

    const result = await fetchAuthOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(authLoginRoute, params);
    expect(result.type).toBe(fetchAuthOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
