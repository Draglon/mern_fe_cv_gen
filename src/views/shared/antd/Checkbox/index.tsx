"use client";
import clsx from "clsx";
import { Checkbox as AntdCheckbox } from "antd";
import type { CheckboxProps } from "antd";

const Checkbox = ({
  className,
  children,
  value = false,
  ...rest
}: CheckboxProps) => {
  return (
    <AntdCheckbox
      className={clsx("checkbox", className)}
      checked={value}
      defaultChecked={value}
      data-testid="checkbox"
      {...rest}
    >
      {children}
    </AntdCheckbox>
  );
};

export default Checkbox;
