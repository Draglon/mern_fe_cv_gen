import * as constants from "../index";

it("general constants match snapshot", () => {
  expect(constants).toMatchSnapshot();
});
