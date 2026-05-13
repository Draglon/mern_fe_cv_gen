"use client";
import clsx from "clsx";
import { equals } from "ramda";
import { Input as AntdInput } from "antd";
import type { InputProps } from "antd";

const Input = ({ classNames, size = "middle", ...rest }: InputProps) => {
  const { Password } = AntdInput;

  return equals(rest?.type, "password") ? (
    <Password
      className={clsx("input", classNames)}
      size={size}
      data-testid="inputPassword"
      {...rest}
    />
  ) : (
    <AntdInput
      className={clsx("input", classNames)}
      size={size}
      data-testid="input"
      {...rest}
    />
  );
};

export default Input;
