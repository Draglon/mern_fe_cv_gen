import { Locales } from "@/lib/constants/props/locales";

import getSectionTitle from "../getSectionTitle";

describe("getSectionTitle", () => {
  const locale = "en" as Locales;

  it("returns localized section title when it exists", () => {
    const data = {
      sectionTitle: { en: "Experience", ru: "Опыт", ua: "Досвід" },
    };

    expect(
      getSectionTitle({ data, locale, defaultTitle: "Default title" })
    ).toBe("Experience");
  });

  it("returns default title when localized section title is missing", () => {
    const data = { sectionTitle: { ru: "Опыт", ua: "Досвід" } };

    expect(
      getSectionTitle({ data, locale, defaultTitle: "Default title" })
    ).toBe("Default title");
  });

  it("returns default title when sectionTitle is not provided", () => {
    expect(
      getSectionTitle({ data: {}, locale, defaultTitle: "Default title" })
    ).toBe("Default title");
  });

  it("returns default title when localized section title is an empty string", () => {
    const data = { sectionTitle: { en: "" } };

    expect(
      getSectionTitle({ data, locale, defaultTitle: "Default title" })
    ).toBe("Default title");
  });
});
