import * as theme from "../theme";

it("theme constants match snapshot", () => {
  expect(theme).toMatchSnapshot();
});
