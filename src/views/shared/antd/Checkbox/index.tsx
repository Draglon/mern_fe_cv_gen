"use client";
import clsx from "clsx";
import { Checkbox as AntdCheckbox } from "antd";
import type { CheckboxProps } from "antd";

const Checkbox = ({
  className,
  children,
  defaultValue,
  ...rest
}: CheckboxProps & { defaultValue?: boolean }) => {
  return (
    <AntdCheckbox
      className={clsx("checkbox", className)}
      defaultChecked={defaultValue}
      {...rest}
    >
      {children}
    </AntdCheckbox>
  );
};

export default Checkbox;
