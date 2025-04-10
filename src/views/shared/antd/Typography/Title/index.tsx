"use client";
import clsx from "clsx";
import Title, { TitleProps } from "antd/lib/typography/Title";

const TypographyTitle = ({
  className,
  type,
  level,
  underline,
  italic,
  children,
  ...rest
}: TitleProps) => {
  return (
    <Title
      className={clsx("title", className)}
      type={type}
      level={level}
      italic={italic}
      underline={underline}
      {...rest}
    >
      {children}
    </Title>
  );
};

export default TypographyTitle;
