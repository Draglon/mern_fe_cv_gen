import * as tools from "../index";

it("tools constants match snapshot", () => {
  expect(tools).toMatchSnapshot();
});
