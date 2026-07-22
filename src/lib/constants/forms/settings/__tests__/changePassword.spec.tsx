import * as changePassword from "../changePassword";

it("changePassword constants match snapshot", () => {
  expect(changePassword).toMatchSnapshot();
});
