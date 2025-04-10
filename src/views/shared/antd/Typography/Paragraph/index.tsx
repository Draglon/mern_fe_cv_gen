"use client";
import clsx from "clsx";
import Paragraph, { ParagraphProps } from "antd/lib/typography/Paragraph";

const TypographyParagraph = ({
  className,
  type,
  underline,
  italic,
  strong,
  children,
  ...rest
}: ParagraphProps) => {
  return (
    <Paragraph
      className={clsx("paragraph", className)}
      type={type}
      italic={italic}
      strong={strong}
      underline={underline}
      {...rest}
    >
      {children}
    </Paragraph>
  );
};

export default TypographyParagraph;
