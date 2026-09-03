import { getProfileDefaultValues } from "..";

describe("getProfileDefaultValues", () => {
  it("returns default values with avatarUrl when avatar exists", () => {
    const user = {
      avatarUrl: "https://example.com/avatar.jpg",
      firstName: "John",
      lastName: "Doe",
      userName: "john.doe",
    };

    expect(getProfileDefaultValues(user)).toEqual({
      avatarUrl: ["https://example.com/avatar.jpg"],
      firstName: "John",
      lastName: "Doe",
      userName: "john.doe",
    });
  });

  it("returns empty avatarUrl when avatar does not exist", () => {
    const user = {
      avatarUrl: "",
      firstName: "John",
      lastName: "Doe",
      userName: "john.doe",
    };

    expect(getProfileDefaultValues(user)).toEqual({
      avatarUrl: [],
      firstName: "John",
      lastName: "Doe",
      userName: "john.doe",
    });
  });

  it("returns empty strings for missing profile fields", () => {
    const user = {
      avatarUrl: "avatar.jpg",
      firstName: undefined,
      lastName: undefined,
      userName: undefined,
    } as unknown as Parameters<typeof getProfileDefaultValues>[0];

    expect(getProfileDefaultValues(user)).toEqual({
      avatarUrl: ["avatar.jpg"],
      firstName: "",
      lastName: "",
      userName: "",
    });
  });
});
