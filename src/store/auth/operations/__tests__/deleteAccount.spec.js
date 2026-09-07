import axios from "@/lib/axios";
import { usersRoute } from "@/lib/apiRoutes";

import { userIdSelector } from "../../selectors";
import deleteAccountOperation from "../deleteAccount";

jest.mock("@/lib/axios");
jest.mock("../../selectors");

const mockedAxios = jest.mocked(axios);
const mockedUserIdSelector = jest.mocked(userIdSelector);

describe("deleteAccountOperation", () => {
  const userId = "user-123";

  const params = {
    userName: "testUser",
    locale: "en",
  };

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUserIdSelector.mockReturnValue(userId);
    getState.mockReturnValue({});
  });

  it("should delete account successfully", async () => {
    mockedAxios.delete.mockResolvedValue({});

    const result = await deleteAccountOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedUserIdSelector).toHaveBeenCalledWith({});

    expect(mockedAxios.delete).toHaveBeenCalledWith(usersRoute(userId), { data: params });
    expect(result.type).toBe(deleteAccountOperation.fulfilled.type);
    expect(result.payload).toBeUndefined();
  });

  it("should reject with error when delete request fails", async () => {
    const error = new Error("Delete account failed");

    mockedAxios.delete.mockRejectedValue(error);

    const result = await deleteAccountOperation(params)(
      dispatch,
      getState,
      undefined,
    );

    expect(mockedAxios.delete).toHaveBeenCalledWith(usersRoute(userId), { data: params });
    expect(result.type).toBe(deleteAccountOperation.rejected.type);
    expect(result.payload).toBe(error);
  });
});
