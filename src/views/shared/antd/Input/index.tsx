"use client";
import clsx from "clsx";
import { equals } from "ramda";
import { Input as AntdInput } from "antd";
import type { InputProps } from "antd";

const Input = ({
  className,
  type = "text",
  size = "middle",
  ...rest
}: InputProps) => {
  const { Password } = AntdInput;

  return equals(type, "password") ? (
    <Password
      className={clsx("input", className)}
      type={type}
      size={size}
      {...rest}
    />
  ) : (
    <AntdInput
      className={clsx("input", className)}
      type={type}
      size={size}
      {...rest}
    />
  );
};

export default Input;
