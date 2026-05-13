"use client";
import clsx from "clsx";
import { InputNumber as AntdInputNumber } from "antd";
import type { InputNumberProps } from "antd";

const InputNumber = ({
  classNames,
  size = "middle",
  ...rest
}: InputNumberProps) => {
  return (
    <AntdInputNumber
      className={clsx("input-number", classNames)}
      size={size}
      data-testid="inputNumber"
      {...rest}
    />
  );
};

export default InputNumber;
