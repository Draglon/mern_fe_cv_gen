import axios from "@/lib/axios";
import { usersPasswordRoute } from "@/lib/apiRoutes";

import { userIdSelector } from "../../selectors";
import updateUserPasswordOperation from "../updateUserPassword";

jest.mock("@/lib/axios");
jest.mock("../../selectors");

const mockedAxios = jest.mocked(axios);
const mockedUserIdSelector = jest.mocked(userIdSelector);

describe("updateUserPasswordOperation", () => {
  const params = {
    currentPassword: "P123456",
    newPassword: "P1234567",
    confirmPassword: "P1234567",
    locale: "en",
  };

  const userId = "user-123";

  const responseData = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
    user: {
      id: userId,
      email: "email@gmail.com",
      password: "P1234567",
    },
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUserIdSelector.mockReturnValue(userId);
    getState.mockReturnValue({});
  });

  it("should update user password successfully", async () => {
    mockedAxios.patch.mockResolvedValue({ data: responseData });

    const result = await updateUserPasswordOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.patch).toHaveBeenCalledWith(usersPasswordRoute(userId), params);
    expect(result.type).toBe(updateUserPasswordOperation.fulfilled.type);
    expect(result.payload).toBeUndefined();
  });

  it("should reject with error", async () => {
    const error = new Error("Update user password failed");

    mockedAxios.patch.mockRejectedValue(error);

    const result = await updateUserPasswordOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.patch).toHaveBeenCalledWith(usersPasswordRoute(userId), params);
    expect(result.type).toBe(updateUserPasswordOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
