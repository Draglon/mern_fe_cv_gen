import * as alert from "../alert";

it("alert constants match snapshot", () => {
  expect(alert).toMatchSnapshot();
});
