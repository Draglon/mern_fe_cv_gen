import * as deleteAccount from "../deleteAccount";

it("deleteAccount constants match snapshot", () => {
  expect(deleteAccount).toMatchSnapshot();
});
