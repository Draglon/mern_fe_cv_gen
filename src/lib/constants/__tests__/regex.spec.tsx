import * as regex from "../regex";

it("regex constants match snapshot", () => {
  expect(regex).toMatchSnapshot();
});
