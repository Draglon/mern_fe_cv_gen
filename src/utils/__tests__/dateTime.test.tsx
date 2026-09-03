import { Locales } from "@/lib/constants/props/locales";

import { formatDate, formatDateRange, formatYearRange } from "../dateTime";

describe("formatDate", () => {
  it("returns empty string when date is not provided", () => {
    expect(formatDate("", "en")).toBe("");
  });

  it("formats date", () => {
    expect(formatDate("2024-05-15", "en")).toBe("15 May 2024");
  });

  it("formats date using Ukrainian locale", () => {
    expect(formatDate("2024-05-15", "ua")).toBe("15 трав 2024");
  });

  it("uses default locale when locale is not provided", () => {
    expect(formatDate("2024-05-15", undefined as unknown as Locales)).toBe(
      "15 May 2024"
    );
  });
});

describe("formatDateRange", () => {
  it("returns empty string when startDate is not provided", () => {
    expect(
      formatDateRange({
        isCurrent: false,
        locale: "en",
      })
    ).toBe("");
  });

  it("formats start and end dates", () => {
    expect(
      formatDateRange({
        isCurrent: false,
        startDate: "2020-05-15",
        endDate: "2024-10-20",
        locale: "en",
      })
    ).toBe("may 2020 - oct 2024");
  });

  it("uses current time when isCurrent is true", () => {
    expect(
      formatDateRange({
        isCurrent: true,
        startDate: "2020-05-15",
        endDate: "2024-10-20",
        locale: "en",
        tCurrentTime: "Present",
      })
    ).toBe("may 2020 - present");
  });

  it("uses current time when endDate is absent", () => {
    expect(
      formatDateRange({
        isCurrent: false,
        startDate: "2020-05-15",
        locale: "en",
        tCurrentTime: "Present",
      })
    ).toBe("may 2020 - present");
  });

  expect(
    formatDateRange({
      isCurrent: false,
      startDate: "2020-05-15",
      endDate: "2024-10-20",
      locale: "ua",
    })
  ).toBe("трав 2020 - жовт 2024");
});

describe("formatYearRange", () => {
  it("returns empty string when startDate is not provided", () => {
    expect(
      formatYearRange({
        isCurrent: false,
        locale: "en",
      })
    ).toBe("");
  });

  it("formats start and end years", () => {
    expect(
      formatYearRange({
        isCurrent: false,
        startDate: "2020-05-15",
        endDate: "2024-10-20",
        locale: "en",
      })
    ).toBe("2020 - 2024");
  });

  it("uses current time when isCurrent is true", () => {
    expect(
      formatYearRange({
        isCurrent: true,
        startDate: "2020-05-15",
        locale: "en",
        tCurrentTime: "Present",
      })
    ).toBe("2020 - present");
  });

  it("uses Ukrainian locale", () => {
    expect(
      formatYearRange({
        isCurrent: false,
        startDate: "2020-05-15",
        endDate: "2024-10-20",
        locale: "ua",
      })
    ).toBe("2020 - 2024");
  });
});
