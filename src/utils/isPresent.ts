import { isNil, isEmpty } from "ramda";

// eslint-disable-next-line import/no-anonymous-default-export
export default (data: unknown) => !isNil(data) && !isEmpty(data);
