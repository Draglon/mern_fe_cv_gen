import * as templates from "../templates";

it("templates constants match snapshot", () => {
  expect(templates).toMatchSnapshot();
});
