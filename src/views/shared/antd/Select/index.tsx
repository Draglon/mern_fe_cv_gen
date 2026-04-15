"use client";
import clsx from "clsx";
import { Select as AntdSelect } from "antd";
import type { SelectProps } from "antd";

const Select = ({
  className,
  rootClassName,
  options = [],
  ...rest
}: SelectProps) => {
  return (
    <AntdSelect
      className={clsx("select", className)}
      rootClassName={clsx("select-dropdown", rootClassName)}
      options={options}
      {...rest}
    />
  );
};

export default Select;
