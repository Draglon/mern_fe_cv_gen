import en from "@/messages/en";
import ru from "@/messages/ru";
import ua from "@/messages/ua";

const getKeys = (obj: unknown, prefix = ""): string[] => {
  if (obj === null || typeof obj !== "object") {
    return [prefix];
  }

  return Object.entries(obj).flatMap(([key, value]) =>
    getKeys(value, prefix ? `${prefix}.${key}` : key)
  );
};

describe("Translations", () => {
  it("has the same translation keys in all locales", () => {
    expect(getKeys(ru).sort()).toEqual(getKeys(en).sort());
    expect(getKeys(ua).sort()).toEqual(getKeys(en).sort());
  });
});
