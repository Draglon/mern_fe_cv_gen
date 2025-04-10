"use client";
import clsx from "clsx";
import { Checkbox as AntdCheckbox } from "antd";
import type { CheckboxProps } from "antd";

const Checkbox = ({ className, children, ...rest }: CheckboxProps) => {
  return (
    <AntdCheckbox className={clsx("checkbox", className)} {...rest}>
      {children}
    </AntdCheckbox>
  );
};

export default Checkbox;
