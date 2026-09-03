import splitText from "../splitText";

describe("splitText", () => {
  it("trims text and splits it by new lines", () => {
    expect(splitText("  First line\nSecond line  ")).toEqual([
      "First line",
      "Second line",
    ]);
  });

  it("returns an array with one item for text without new lines", () => {
    expect(splitText("  Text  ")).toEqual(["Text"]);
  });
});
