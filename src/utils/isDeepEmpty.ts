import { pipe, all, isEmpty, values } from "ramda";

export default pipe(values, all(isEmpty));
