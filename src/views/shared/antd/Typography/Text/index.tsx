"use client";
import clsx from "clsx";
import Text, { TextProps } from "antd/lib/typography/Text";

const TypographyText = ({
  className,
  type,
  underline,
  italic,
  strong,
  children,
  ...rest
}: TextProps) => {
  return (
    <Text
      className={clsx("text", className)}
      type={type}
      italic={italic}
      strong={strong}
      underline={underline}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default TypographyText;
