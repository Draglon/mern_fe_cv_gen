import * as hobbies from "../index";

it("hobbies constants match snapshot", () => {
  expect(hobbies).toMatchSnapshot();
});
