import * as courses from "../index";

it("courses constants match snapshot", () => {
  expect(courses).toMatchSnapshot();
});
