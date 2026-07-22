import * as login from "../index";

it("login constants match snapshot", () => {
  expect(login).toMatchSnapshot();
});
