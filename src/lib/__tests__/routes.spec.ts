import * as routes from "../routes";

it("routes constants match snapshot", () => {
  expect(routes).toMatchSnapshot();
});
