import profileInitials from "../profileInitials";

describe("profileInitials", () => {
  it("returns empty string when user is null", () => {
    expect(profileInitials(null)).toBe("");
  });

  it("returns initials from firstName and lastName", () => {
    expect(
      profileInitials({
        firstName: "John",
        lastName: "Doe",
        userName: "johndoe",
      })
    ).toBe("JD");
  });

  it("returns initials from available first name when last name is missing", () => {
    expect(
      profileInitials({
        firstName: "John",
        lastName: null,
        userName: "johndoe",
      })
    ).toBe("J");
  });

  it("returns initials from available last name when first name is missing", () => {
    expect(
      profileInitials({
        firstName: null,
        lastName: "Doe",
        userName: "johndoe",
      })
    ).toBe("D");
  });

  it("returns initials from userName when firstName and lastName are missing", () => {
    expect(
      profileInitials({
        firstName: null,
        lastName: null,
        userName: "johndoe",
      })
    ).toBe("J");
  });
});
