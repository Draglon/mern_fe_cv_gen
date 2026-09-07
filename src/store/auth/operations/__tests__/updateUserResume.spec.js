import axios from "@/lib/axios";
import { usersResumeRoute } from "@/lib/apiRoutes";

import { userIdSelector } from "../../selectors";
import updateUserResumeOperation from "../updateUserResume";

jest.mock("@/lib/axios");
jest.mock("../../selectors");

const mockedAxios = jest.mocked(axios);
const mockedUserIdSelector = jest.mocked(userIdSelector);

describe("updateUserResumeOperation", () => {
  const params = {
    currentStep: 0,
    isCreated: true,
    locale: "en",
  };

  const userId = "user-123";

  const responseData = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
    user: {
      id: userId,
      currentStep: 0,
      isCreated: true,
    },
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUserIdSelector.mockReturnValue(userId);
    getState.mockReturnValue({});
  });


  it("should update user resume successfully", async () => {
    mockedAxios.patch.mockResolvedValue({ data: responseData });

    const result = await updateUserResumeOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedUserIdSelector).toHaveBeenCalledWith({});
    expect(mockedAxios.patch).toHaveBeenCalledWith(usersResumeRoute(userId), params);
    expect(result.type).toBe(updateUserResumeOperation.fulfilled.type);
    expect(result.payload).toEqual(responseData);
  });

  it("should reject with error", async () => {
    const error = new Error("Update user resume failed");

    mockedAxios.patch.mockRejectedValue(error);

    const result = await updateUserResumeOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.patch).toHaveBeenCalledWith(usersResumeRoute(userId), params);
    expect(result.type).toBe(updateUserResumeOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
