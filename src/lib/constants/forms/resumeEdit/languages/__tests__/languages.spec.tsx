import * as languages from "../index";

it("languages constants match snapshot", () => {
  expect(languages).toMatchSnapshot();
});
