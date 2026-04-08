"use client";
import clsx from "clsx";
import { Checkbox as AntdCheckbox } from "antd";
import type { CheckboxProps } from "antd";

const Checkbox = ({
  className,
  children,
  defaultValue = false,
  ...rest
}: CheckboxProps & { defaultValue?: boolean }) => {
  return (
    <AntdCheckbox
      className={clsx("checkbox", className)}
      checked={defaultValue}
      defaultChecked={defaultValue}
      {...rest}
    >
      {children}
    </AntdCheckbox>
  );
};

export default Checkbox;
