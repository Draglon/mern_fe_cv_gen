import * as locales from "../locales";

it("locales constants match snapshot", () => {
  expect(locales).toMatchSnapshot();
});
