"use client";
import clsx from "clsx";
import { Select as AntdSelect } from "antd";
import type { SelectProps } from "antd";

const Select = ({ rootClassName, options = [], ...rest }: SelectProps) => {
  return (
    <AntdSelect
      rootClassName={clsx("select", rootClassName)}
      options={options}
      {...rest}
    />
  );
};

export default Select;
