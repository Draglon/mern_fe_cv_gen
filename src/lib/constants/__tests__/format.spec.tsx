import * as format from "../format";

it("format constants match snapshot", () => {
  expect(format).toMatchSnapshot();
});
