import * as education from "../index";

it("education constants match snapshot", () => {
  expect(education).toMatchSnapshot();
});
