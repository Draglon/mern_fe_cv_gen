"use client";
import clsx from "clsx";
import { Input } from "antd";
import type { TextAreaProps } from "antd/lib/input";

const TextArea = ({ className, rootClassName, ...rest }: TextAreaProps) => {
  const { TextArea } = Input;

  return (
    <TextArea
      className={clsx("textarea", className)}
      rootClassName={clsx("textarea__root", rootClassName)}
      {...rest}
    />
  );
};

export default TextArea;
