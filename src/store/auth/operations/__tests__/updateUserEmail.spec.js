import axios from "@/lib/axios";
import { usersEmailRoute } from "@/lib/apiRoutes";

import { userIdSelector } from "../../selectors";
import updateUserEmailOperation from "../updateUserEmail";

jest.mock("@/lib/axios");
jest.mock("../../selectors");

const mockedAxios = jest.mocked(axios);
const mockedUserIdSelector = jest.mocked(userIdSelector);

describe("updateUserEmailOperation", () => {
  const params = {
    newEmail: "newemail@gmail.com",
    password: "P123456",
    locale: "en",
  };

  const userId = "user-123";

  const responseData = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
    user: {
      id: userId,
      email: "email@gmail.com",
    },
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUserIdSelector.mockReturnValue(userId);
    getState.mockReturnValue({});
  });

  it("should update user email successfully", async () => {
    mockedAxios.patch.mockResolvedValue({ data: responseData });

    const result = await updateUserEmailOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.patch).toHaveBeenCalledWith(usersEmailRoute(userId), params);
    expect(result.type).toBe(updateUserEmailOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update user email failed");

    mockedAxios.patch.mockRejectedValue(error);

    const result = await updateUserEmailOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.patch).toHaveBeenCalledWith(usersEmailRoute(userId), params);
    expect(result.type).toBe(updateUserEmailOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
