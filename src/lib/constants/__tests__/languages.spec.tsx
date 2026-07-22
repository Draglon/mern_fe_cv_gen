import * as languages from "../languages";

it("languages constants match snapshot", () => {
  expect(languages).toMatchSnapshot();
});
