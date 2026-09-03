import profileName from "../profileName";

describe("profileName", () => {
  const profile = {
    firstName: {
      en: "John",
      ru: "Джон",
      ua: "Джон",
    },
    lastName: {
      en: "Doe",
      ru: "Доу",
      ua: "Доу",
    },
  };

  it("returns full name for the selected locale", () => {
    expect(profileName(profile, "en")).toBe("John Doe");
    expect(profileName(profile, "ru")).toBe("Джон Доу");
  });

  it("returns '-' when firstName is not present for locale", () => {
    expect(
      profileName(
        {
          ...profile,
          firstName: {
            ...profile.firstName,
            en: "",
          },
        },
        "en"
      )
    ).toBe("-");
  });

  it("returns '-' when lastName is not present for locale", () => {
    expect(
      profileName(
        {
          ...profile,
          lastName: {
            ...profile.lastName,
            en: "",
          },
        },
        "en"
      )
    ).toBe("-");
  });
});
