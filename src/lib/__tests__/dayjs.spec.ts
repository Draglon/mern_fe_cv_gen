import dayjs from "../dayjs";

describe("dayjs config", () => {
  it("supports localized format", () => {
    expect(dayjs("2026-07-22").format("L")).toBeTruthy();
  });
});
