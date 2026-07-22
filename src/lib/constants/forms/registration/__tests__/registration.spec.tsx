import * as registration from "../index";

it("registration constants match snapshot", () => {
  expect(registration).toMatchSnapshot();
});
