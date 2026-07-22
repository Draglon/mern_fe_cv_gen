import enUS from "antd/locale/en_US";
import ruRU from "antd/locale/ru_RU";
import ukUA from "antd/locale/uk_UA";

import getAntdLocale from "../antdLocale";

describe("getAntdLocale", () => {
  it("returns English locale", () => {
    expect(getAntdLocale("en")).toBe(enUS);
  });

  it("returns Ukrainian locale", () => {
    expect(getAntdLocale("ua")).toBe(ukUA);
  });

  it("returns Russian locale", () => {
    expect(getAntdLocale("ru")).toBe(ruRU);
  });

  it("returns English locale for unknown locale", () => {
    expect(getAntdLocale("de")).toBe(enUS);
  });

  it("returns English locale for empty string", () => {
    expect(getAntdLocale("")).toBe(enUS);
  });

  it("returns English locale for undefined", () => {
    expect(getAntdLocale(undefined as unknown as string)).toBe(enUS);
  });
});
