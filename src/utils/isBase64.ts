const isBase64 = (value: unknown): value is string => {
  return (
    typeof value === "string" &&
    /^data:image\/[a-zA-Z+]+;base64,/.test(value)
  );
};

export default isBase64;