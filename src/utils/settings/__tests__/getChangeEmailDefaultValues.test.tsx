import { getChangeEmailDefaultValues } from "..";

describe("getChangeEmailDefaultValues", () => {
  it("returns email and empty password", () => {
    expect(getChangeEmailDefaultValues("test@example.com")).toEqual({
      newEmail: "test@example.com",
      password: "",
    });
  });

  it("returns empty newEmail when email is empty", () => {
    expect(getChangeEmailDefaultValues("")).toEqual({
      newEmail: "",
      password: "",
    });
  });
});
