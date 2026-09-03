import { getPersistor } from "@/store/storeInstance";
import { logout as logoutAction } from "@/store/auth/actions";

import clearAuthSession from "../clearAuthSession";

jest.mock("@/store/storeInstance", () => ({
  getPersistor: jest.fn(),
}));

jest.mock("@/store/auth/actions", () => ({
  logout: jest.fn(() => ({ type: "auth/logout" })),
}));

const mockedGetPersistor = jest.mocked(getPersistor);
const mockedLogoutAction = jest.mocked(logoutAction);

describe("clearAuthSession", () => {
  it("clears auth session", async () => {
    const dispatch = jest.fn();
    const purge = jest.fn().mockResolvedValue(undefined);

    mockedGetPersistor.mockReturnValue({
      purge,
    } as unknown as ReturnType<typeof getPersistor>);

    localStorage.setItem("token", "test-token");

    await clearAuthSession(dispatch);

    expect(localStorage.getItem("token")).toBeNull();
    expect(purge).toHaveBeenCalled();
    expect(mockedLogoutAction).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: "auth/logout",
    });
  });
});
