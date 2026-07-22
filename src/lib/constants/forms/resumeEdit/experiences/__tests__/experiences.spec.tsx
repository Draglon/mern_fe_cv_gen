import * as experiences from "../index";

it("experiences constants match snapshot", () => {
  expect(experiences).toMatchSnapshot();
});
