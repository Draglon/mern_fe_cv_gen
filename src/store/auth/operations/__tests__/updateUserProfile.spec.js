import axios from "@/lib/axios";
import { usersRoute } from "@/lib/apiRoutes";
import { normalizeUrl } from "@/utils/normalizeUrl";

import { userIdSelector } from "../../selectors";
import updateUserProfileOperation from "../updateUserProfile";

jest.mock("@/lib/axios");
jest.mock("@/utils/normalizeUrl");
jest.mock("../../selectors");

const mockedAxios = jest.mocked(axios);
const mockedUserIdSelector = jest.mocked(userIdSelector);
const mockedNormalizeUrl = jest.mocked(normalizeUrl);

describe("updateUserProfileOperation", () => {
  const params = {
    avatarUrl: [],
    firstName: "John",
    lastName: "Doe",
    userName: "JohnDoe",
    locale: "en",
  };

  const userId = "user-123";
  const normalizedAvatarUrl = "https://example.com/avatar.jpg";

  const responseData = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
    user: {
      id: userId,
      email: "email@gmail.com",
      password: "P1234567",
      avatarUrl: normalizedAvatarUrl,
      firstName: "John",
      lastName: "Doe",
      userName: "JohnDoe",
    },
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUserIdSelector.mockReturnValue(userId);
    mockedNormalizeUrl.mockResolvedValue(normalizedAvatarUrl);
    getState.mockReturnValue({});
  });


  it("should update user profile successfully", async () => {
    mockedAxios.patch.mockResolvedValue({ data: responseData });

    const result = await updateUserProfileOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedUserIdSelector).toHaveBeenCalledWith({});
    expect(mockedNormalizeUrl).toHaveBeenCalledWith(params.avatarUrl);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      usersRoute(userId),
      {
        ...params,
        avatarUrl: normalizedAvatarUrl,
      },
    );
    expect(result.type).toBe(updateUserProfileOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update user profile failed");

    mockedAxios.patch.mockRejectedValue(error);

    const result = await updateUserProfileOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedNormalizeUrl).toHaveBeenCalledWith(params.avatarUrl);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      usersRoute(userId),
      {
        ...params,
        avatarUrl: normalizedAvatarUrl,
      },
    );
    expect(result.type).toBe(updateUserProfileOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
