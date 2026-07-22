import * as skills from "../index";

it("skills constants match snapshot", () => {
  expect(skills).toMatchSnapshot();
});
