import axios from "@/lib/axios";
import { authUserRoute } from "@/lib/apiRoutes";

import fetchUserOperation from "../fetchUser";

jest.mock("@/lib/axios");

const mockedAxios = jest.mocked(axios);

describe("fetchUserOperation", () => {
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

  it("should fetch user successfully", async () => {
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await fetchUserOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(authUserRoute, {});
    expect(result.type).toBe(fetchUserOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Fetch user failed");

    mockedAxios.get.mockRejectedValue(error);

    const result = await fetchUserOperation()(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(authUserRoute, {});
    expect(result.type).toBe(fetchUserOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
