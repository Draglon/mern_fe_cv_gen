import { pipe, trim, split } from "ramda";

const splitText = pipe(
  trim,
  split(/\n/g)
);

export default splitText;
