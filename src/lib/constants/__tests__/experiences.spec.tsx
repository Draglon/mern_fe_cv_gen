import * as experiences from "../experiences";

it("experiences constants match snapshot", () => {
  expect(experiences).toMatchSnapshot();
});
